import {
  Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appLoadImage]',
})
export class LoadImageDirective implements OnChanges {
  @Input()
  page: string;

  @Input()
  appLoadImage: boolean;

  constructor(private elRef: ElementRef, private rend: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appLoadImage.currentValue) {
      this.rend.setAttribute(this.elRef.nativeElement, 'src', this.page);
    } else {
      this.rend.removeAttribute(this.elRef.nativeElement, 'src');
    }
  }
}
