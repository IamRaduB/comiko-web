import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comic, CreateComic } from './models/comic.model';

@Injectable({
  providedIn: 'root',
})
export class ComicData {
  constructor(private http: HttpClient) { }

  listPages(id: number): Observable<string[]> {
    return this.http.get<string[]>(`/api/comics/${id}/pages`);
  }

  getComics(): Observable<Comic[]> {
    return this.http.get<Comic[]>('/api/comics');
  }

  createComic(comicData: CreateComic): Observable<Comic> {
    return this.http.post<Comic>('/api/comics', comicData);
  }
}
