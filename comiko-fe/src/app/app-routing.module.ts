import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ComicListComponent } from './comics/comic-list/comic-list.component';
import { ViewComicComponent } from './comics/view-comic/view-comic.component';
import { ComicReaderComponent } from './comics/comic-reader/comic-reader.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/comics',
    pathMatch: 'full',
  },
  {
    path: 'comics',
    children: [
      {
        path: '',
        component: ComicListComponent,
      },
      {
        path: ':id',
        component: ViewComicComponent,
        children: [
          {
            path: 'pages/:pageId',
            outlet: 'reader',
            component: ComicReaderComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
