import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComicService } from '../comic.service';
import { SelectedComic } from '../models/comic.model';
import { ReaderService } from '../reader.service';

const MAX_ZOOM_LEVEL = 4;

@Component({
  selector: 'app-comic-reader',
  templateUrl: './comic-reader.component.html',
  styleUrls: ['./comic-reader.component.scss'],
})
export class ComicReaderComponent {
  @Output()
  toggleThumbnail: EventEmitter<any> = new EventEmitter<any>();

  selectedComic$: Observable<SelectedComic>;

  pageForm: FormGroup = new FormGroup({
    page: new FormControl(0, [
      Validators.required, Validators.pattern(/\d/),
    ]),
  });

  thumbnailsVisible: boolean;

  zoomLevel: number;

  maxZoomLevel = MAX_ZOOM_LEVEL;

  constructor(private comicService: ComicService, private readerService: ReaderService) {
    this.selectedComic$ = this.comicService.selectedComic
      .pipe(
        filter((comic) => comic && !!comic.pages),
      );

    this.readerService.thumbnailsVisible
      .subscribe((state: boolean) => {
        this.thumbnailsVisible = state;
      });

    this.readerService.zoomLevel
      .subscribe((level: number) => {
        this.zoomLevel = level;
      });
  }

  toggleThumbnailsDisplay() {
    this.readerService.toggleThumbnails();
  }

  zoomIn() {
    if (this.zoomLevel !== this.maxZoomLevel) {
      this.readerService.setZoomLevel(this.zoomLevel + 1);
    }
  }

  zoomOut() {
    if (this.zoomLevel !== 0) {
      this.readerService.setZoomLevel(this.zoomLevel - 1);
    }
  }

  nextPage() {
    this.comicService.incrementPage();
  }

  previousPage() {
    this.comicService.decrementPage();
  }

  goToPage() {
    console.log(this.pageForm.value);
    if (this.pageForm.valid) {
      this.comicService.setPage(this.pageForm.value.page);
    }
  }
}
