import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ComicService } from '../comic.service';
import { Observable } from 'rxjs';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-view-comic',
  templateUrl: './view-comic.component.html',
  styleUrls: ['./view-comic.component.scss'],
})
export class ViewComicComponent implements OnInit {
  thumbnailsVisible$: Observable<boolean>;

  constructor(private comicService: ComicService, private route: ActivatedRoute, private readerService: ReaderService) {
    this.thumbnailsVisible$ = readerService.thumbnailsVisible;
  }

  ngOnInit(): void {
    this.comicService.loadComics();
    this.route.paramMap
      .subscribe((params: ParamMap) => this.comicService.listComicPages(Number(params.get('id'))));
  }
}
