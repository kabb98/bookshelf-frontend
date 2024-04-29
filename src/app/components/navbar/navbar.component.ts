import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksApiService } from '../../services/books/books-api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: [BooksApiService]
})
export class NavbarComponent implements OnInit {
  searchValue: string = '';
  booksSearched: any[] = [];
  searchForm = this.fb.nonNullable.group(
    {
      searchValue: ''
    }
  );

  constructor(
    private booksApi: BooksApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  searchBooks(query: string) {
    this.booksApi.getBooksApi(query).subscribe(booksFromApi => {
      this.booksSearched = booksFromApi;
      this.booksApi.updateBooksSearched(this.booksSearched);
    });
    this.router.navigate(['/searched_books']);
  }

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.searchBooks(this.searchValue);
    this.booksApi.updateSearchValue(this.searchValue);
  }
}
