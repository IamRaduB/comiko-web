import {
  Directive,
  ElementRef,
  EventEmitter, Input, OnDestroy, OnInit, Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromIntersectionObserver, IntersectionStatus } from '../../comics/from-intersection.observer';

@Directive({
  selector: '[appIntersectionObserver]',
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  @Input()
  intersectionDebounce = 0;

  @Input()
  intersectionRootMargin = '0px';

  @Input()
  intersectionRoot: HTMLElement;

  @Input()
  intersectionThreshold: number | number[];

  @Output()
  visibilityChanged = new EventEmitter<IntersectionStatus>();

  destroy$ = new Subject();

  constructor(private element: ElementRef) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    const elem = this.element.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold,
    };

    fromIntersectionObserver(
      elem,
      config,
      this.intersectionDebounce,
    )
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((status) => {
        this.visibilityChanged.emit(status);
      });
  }
}
