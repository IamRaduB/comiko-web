import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UploadModule } from '../upload/upload.module';
import { ComicComponent } from './comic/comic.component';
import { ComicListComponent } from './comic-list/comic-list.component';
import { CreateComicComponent } from './create-comic/create-comic.component';
import { ViewComicComponent } from './view-comic/view-comic.component';
import { ComicNavComponent } from './comic-nav/comic-nav.component';
import { ComicReaderComponent } from './comic-reader/comic-reader.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ComicComponent,
    ComicListComponent,
    CreateComicComponent, ViewComicComponent, ComicNavComponent, ComicReaderComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    UploadModule,
    DragDropModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class ComicsModule {
}
