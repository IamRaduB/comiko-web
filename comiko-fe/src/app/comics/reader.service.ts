import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  thumbnailsVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  zoomLevel$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  toggleThumbnails() {
    this.thumbnailsVisible$.next(!this.thumbnailsVisible$.value);
  }

  get thumbnailsVisible() {
    return this.thumbnailsVisible$.asObservable();
  }

  setZoomLevel(level: number) {
    this.zoomLevel$.next(level);
  }

  get zoomLevel() {
    return this.zoomLevel$.asObservable();
  }
}
