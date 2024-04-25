import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'books', component: BooksComponent}
];
