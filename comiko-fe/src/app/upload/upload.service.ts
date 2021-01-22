import { Injectable } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UploadData } from './upload.data';
import { UploadResult } from './models/upload-result';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  urls$: BehaviorSubject<UploadResult> = new BehaviorSubject(null);

  constructor(private uploadData: UploadData) {}

  upload(file: File, type: string, name: string) {
    const formData = new FormData();
    formData.append(name, file);

    return this.uploadData.upload(type, formData)
      .subscribe((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            this.progress$.next(Math.round((event.loaded / event.total) * 100));
            break;
          case HttpEventType.Response:
            this.progress$.next(0);
            this.urls$.next(event.body);
            break;
          default:
            break;
        }
      });
  }

  getProgress(): Observable<number> {
    return this.progress$.asObservable();
  }

  getUrls() {
    return this.urls$.asObservable();
  }
}
