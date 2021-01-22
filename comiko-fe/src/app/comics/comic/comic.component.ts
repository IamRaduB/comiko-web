import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comic } from '../models/comic.model';

@Component({
  selector: 'app-comic',
  templateUrl: './comic.component.html',
  styleUrls: ['./comic.component.scss'],
})
export class ComicComponent {
  @Input()
  comic: Comic;

  hover = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  goToComic() {
    this.router.navigate(['./', this.comic.id], {
      relativeTo: this.route,
    });
  }
}
