import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../interfaces/books/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = 'http://localhost:8000/books/';

  constructor(private http: HttpClient) { }

  getMyData(): Observable<Book[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.results)
    );
  }
}