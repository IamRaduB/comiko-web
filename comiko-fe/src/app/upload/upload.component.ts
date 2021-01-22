import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  takeUntil,
} from 'rxjs/operators';
import { UploadService } from './upload.service';
import { UploadResult } from './models/upload-result';

const UPLOAD_EMPTY = 'Select a file';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input()
  type: string;

  @Output()
  result: EventEmitter<UploadResult> = new EventEmitter<UploadResult>();

  uploadLabel = UPLOAD_EMPTY;

  destroy$: Subject<void> = new Subject<void>();

  progress$: Observable<number>;

  constructor(private uploadService: UploadService) {
    this.progress$ = uploadService.getProgress();
  }

  uploadFile(evt: Event) {
    const file = (evt.target as HTMLInputElement).files[0];
    this.uploadLabel = file.name;
    this.uploadService.upload(file, this.type, 'image');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    this.uploadService.getUrls()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((result) => {
        this.result.emit(result);
      });
  }
}
