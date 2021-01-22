import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  catchError, filter, map, switchMap, tap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { ComicData } from './comic.data';
import { Comic, CreateComic, SelectedComic } from './models/comic.model';
import { ReaderService } from './reader.service';

@Injectable({
  providedIn: 'root',
})
export class ComicService {
  comics$: BehaviorSubject<Comic[]> = new BehaviorSubject<Comic[]>(null);

  selectedComic$: BehaviorSubject<SelectedComic> = new BehaviorSubject<SelectedComic>(null);

  constructor(private comicData: ComicData,
    private router: Router,
    private readerService: ReaderService) {
  }

  loadComics() {
    if (this.comics$.value) {
      console.log('already have comics');
      return;
    }

    console.log('getting comics');
    this.comicData.getComics()
      .pipe(
        catchError((err) => {
          console.log('Unable to get comics');
          return throwError(err);
        }),
      )
      .subscribe((comics: Comic[]) => {
        console.log('loaded comics', comics);
        this.comics$.next(comics);
      });
  }

  listComicPages(id: number) {
    console.log('listing pages');
    // list pages only when the comics list has been retrieved
    return this.comics$.pipe(
      filter((comics: Comic[]) => comics !== null),
      switchMap((comics: Comic[]) => {
        console.log('triggering listing');
        return this.comicData.listPages(id)
          .pipe(
            catchError((err) => {
              console.log('Failed to load pages for comic', id);
              return throwError(err);
            }),
            map((pages: string[]) => {
              const selectedComic = comics.find((comic) => comic.id === id);
              if (!selectedComic) {
                return throwError(`Unable to find comic ${id}`);
              }

              return {
                ...selectedComic,
                pages,
                selectedPageIndex: 0,
              };
            }),
          );
      }),
    )
      .subscribe((comic: SelectedComic) => this.setSelectedComic(comic));
  }

  get comics(): Observable<Comic[]> {
    return this.comics$.asObservable();
  }

  get selectedComic(): Observable<SelectedComic> {
    return this.selectedComic$.asObservable();
  }

  setSelectedComic(comic: SelectedComic) {
    console.log('set selected comic', comic);
    this.selectedComic$.next(comic);
  }

  setPage(index: number) {
    const updatedComic = {
      ...this.selectedComic$.value,
      selectedPageIndex: index,
    };
    this.setSelectedComic(updatedComic);
    // wait for the comic to be loaded from other processes
    this.selectedComic$.pipe(
      filter((comic: SelectedComic) => !!comic.id),
    )
      .subscribe((comic) => {
        this.readerService.setZoomLevel(0);
        this.router.navigate(['comics', comic.id, { outlets: { reader: ['pages', index] } }]);
      });
  }

  incrementPage() {
    const comic = this.selectedComic$.value;
    if (comic.selectedPageIndex !== comic.pages.length) {
      this.setPage(comic.selectedPageIndex + 1);
    }
  }

  decrementPage() {
    const comic = this.selectedComic$.value;
    if (comic.selectedPageIndex > 0) {
      this.setPage(this.selectedComic$.value.selectedPageIndex - 1);
    }
  }

  createComic(comicPayload: CreateComic) {
    return this.comicData.createComic(comicPayload)
      .pipe(
        catchError((err) => {
          console.log('Unable to create comic', comicPayload);
          return throwError(err);
        }),
        tap((comic: Comic) => {
          this.comics$.next([...this.comics$.value, comic]);
        }),
      );
  }
}
