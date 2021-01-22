import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadImageDirective } from './load-image/load-image.directive';
import { IntersectionObserverDirective } from './load-image/intersection-observer.directive';


@NgModule({
  declarations: [
    LoadImageDirective,
    IntersectionObserverDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoadImageDirective,
    IntersectionObserverDirective,
  ],
})
export class SharedModule { }
