import { Component, Inject, inject } from '@angular/core';
import { BooksApiService } from '../../services/books/books-api.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-searched-books',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './searched-books.component.html',
  styleUrl: './searched-books.component.css'
})
export class SearchedBooksComponent {
  searchedBooks: any[] = [];
  currentPage = 1;
  pages : number[] = [];
  searchValue: string = '';

  constructor(private booksApi: BooksApiService) {
    this.booksApi.booksSearched$.subscribe(books => {
      this.searchedBooks = books;
      this.pages = Array(Math.ceil(this.searchedBooks.length / 10)).fill(0).map((x, i) => i + 1);
    });

    this.booksApi.searchValue$.subscribe(value => {
      this.searchValue = value;
    });
  }


  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      
      this.booksApi.getBooksApi(this.searchValue, this.currentPage).subscribe(books => {
        this.searchedBooks = books;
      });
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++;
      
      this.booksApi.getBooksApi(this.searchValue, this.currentPage).subscribe(books => {
        this.searchedBooks = books;
      });
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    // Aquí deberías cargar los datos de la nueva página
    this.booksApi.getBooksApi(this.searchValue, this.currentPage).subscribe(books => {
      this.searchedBooks = books;
    });
  }
}