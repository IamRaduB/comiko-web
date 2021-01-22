import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadResult } from './models/upload-result';

@Injectable({
  providedIn: 'root',
})
export class UploadData {
  constructor(private http: HttpClient) { }

  upload(type: string, formData: FormData): Observable<HttpEvent<UploadResult>> {
    return this.http.post<UploadResult>(`/api/upload/${type}`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
