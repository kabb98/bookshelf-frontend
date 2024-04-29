import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/books/books';
import { BooksService } from '../../services/books/books.service';
import { CommonModule } from '@angular/common';
import { BooksApiService } from '../../services/books/books-api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksService, BooksApiService],
  imports: [CommonModule],
  standalone: true
})


export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) { }




  ngOnInit() {
    this.booksService.getMyData().subscribe(books => {
      this.books = books;
    });
  }
}