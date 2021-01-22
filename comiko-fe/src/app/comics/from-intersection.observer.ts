import { Observable, Subject } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

export enum IntersectionStatus {
  VISIBLE,
  HIDDEN
}

function isIntersecting(entry: IntersectionObserverEntry) {
  return entry.isIntersecting || entry.intersectionRatio > 0;
}

function isVisible(element: HTMLElement): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const observer = new IntersectionObserver(([entry]) => {
      resolve(entry.isIntersecting);
      observer.disconnect();
    });

    observer.observe(element);
  });
}

export function fromIntersectionObserver(
  element: HTMLElement,
  config: IntersectionObserverInit,
  debounce = 0,
) {
  return new Observable<IntersectionStatus>((subscriber) => {
    const subject$ = new Subject<{
      entry: IntersectionObserverEntry,
      observer: IntersectionObserver,
    }>();

    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (isIntersecting(entry)) {
            subject$.next({ entry, observer });
          }
        });
      },
      config,
    );

    subject$.pipe(
      debounceTime(debounce),
      filter(Boolean),
    )
      .subscribe(async ({ entry, observer }) => {
        const isEntryVisible = await isVisible(entry.target as HTMLElement);

        if (isEntryVisible) {
          subscriber.next(IntersectionStatus.VISIBLE);
          observer.unobserve(element);
        } else {
          subscriber.next(IntersectionStatus.HIDDEN);
        }
      });

    intersectionObserver.observe(element);

    return {
      unsubscribe(): void {
        intersectionObserver.disconnect();
        subject$.unsubscribe();
      },
    };
  });
}
