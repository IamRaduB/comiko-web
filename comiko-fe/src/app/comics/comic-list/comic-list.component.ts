import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { ComicService } from '../comic.service';
import { Comic } from '../models/comic.model';
import { UploadResult } from '../../upload/models/upload-result';

@Component({
  selector: 'app-comic-list',
  templateUrl: './comic-list.component.html',
  styleUrls: ['./comic-list.component.scss'],
})
export class ComicListComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;

  comics$: Observable<Comic[]>;

  destroy$: Subject<void> = new Subject<void>();

  isLoading = false;

  submitted = false;

  sidenavState = false;

  createComicForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    path: new FormControl('', Validators.required),
  });

  constructor(private comicService: ComicService) {
    this.comics$ = this.comicService.comics;
  }

  ngOnInit(): void {
    this.comicService.loadComics();
  }

  onFileUpload(result: UploadResult) {
    this.createComicForm.get('path').setValue(result.url);
  }

  submitForm() {
    this.isLoading = true;
    this.submitted = true;
    this.comicService.createComic(this.createComicForm.value)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.submitted = false;
        }),
      )
      .subscribe(() => {
        this.sidenavState = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  toggleSidenav() {
    this.sidenavState = !this.sidenavState;
  }
}
