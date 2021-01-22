import {
  Component, OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SelectedComic } from '../models/comic.model';
import { ComicService } from '../comic.service';
import { ReaderService } from '../reader.service';
import { IntersectionStatus } from '../from-intersection.observer';

@Component({
  selector: 'app-comic-nav',
  templateUrl: './comic-nav.component.html',
  styleUrls: ['./comic-nav.component.scss'],
})
export class ComicNavComponent implements OnInit {
  selectedComic$: Observable<SelectedComic>;

  intersectionStatuses = IntersectionStatus;

  visibilityStatus: {[key: number]: IntersectionStatus} = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comicService: ComicService,
    private readerService: ReaderService,
  ) {
    this.selectedComic$ = this.comicService.selectedComic;
  }

  ngOnInit(): void {
    this.comicService.comics
      .pipe(
        filter((comics) => comics !== null),
        switchMap(() => this.route.paramMap
          .pipe(
            map((params: ParamMap) => Number(params.get('pageId'))),
          )),
      )
      .subscribe((pageId: number) => {
        this.selectPage(pageId);
      });
  }

  selectPage(index: number) {
    this.comicService.setPage(index);
  }

  close() {
    this.readerService.toggleThumbnails();
  }

  onVisibilityChanged(i, status: IntersectionStatus) {
    this.visibilityStatus[i] = status;
  }
}
