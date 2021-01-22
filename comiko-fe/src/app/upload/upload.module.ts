import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadComponent } from './upload.component';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [UploadComponent],
})
export class UploadModule { }
