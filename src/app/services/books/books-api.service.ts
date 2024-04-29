import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {
  private apiUrl = 'https://openlibrary.org/search.json';
  private coverUrl = 'https://covers.openlibrary.org/b/id';

  private fields = 'title,author_name,publish_date,cover_i';
  private limit = 30;

  private booksSearchedSource = new BehaviorSubject<any[]>([]);
  booksSearched$ = this.booksSearchedSource.asObservable();


  // Search value desde Navbar
  private searchValueSource = new BehaviorSubject<string>('');
  searchValue$ = this.searchValueSource.asObservable();

  updateSearchValue(value: string) {
    this.searchValueSource.next(value);
  }

  constructor(private http: HttpClient) { }

  getBooksApi(query: string, page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?q=${encodeURIComponent(query)}&fields=${this.fields}
    &limit=${this.limit}&page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response: any) => response.docs.map((book: any) => ({
        ...book,
        cover: this.getCoverImage(book.cover_i)
      })))
    );
  }

  getCoverImage(id: number): string {
    const url = `${this.coverUrl}/${id}-M.jpg`;
    
    if (id == undefined) {
      return 'undefined';
    }
    
    return url;
  }

  // Esto se usa para tenerlo en otro sitio
  updateBooksSearched(books: any[]) {
    this.booksSearchedSource.next(books);
  }
}