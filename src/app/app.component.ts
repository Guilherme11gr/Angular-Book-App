import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import Book from './Model/book';
import { BookServiceService } from './book-service.service';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Fav-Books';
  durationInSeconds = 5;
  books: Book[];

  constructor(
    private bookService: BookServiceService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar) { }

  getBooks(): void {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(book: Book): void {
    this.bookService.deleteBook(book._id).subscribe(
      reponse => {
        this.openSnackBar('Exclusão efetuada com sucesso !', 'OK');
        this.getBooks();
      },
      err => this.openSnackBar('A exclusão não pode ser efetuada com sucesso !', 'OK'),
    );
  }

  editBook(book: Book): void {
    this.dialogService.openFormModal(book).subscribe(
      success => {
        if (success && success !== 'close') {
          this.openSnackBar('Edição efetuada com sucesso !', 'OK');
          this.getBooks();
        } else if (success !== 'close') {
          this.openSnackBar('A edição não pode ser efetuada com sucesso !', 'OK');
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000
    });
  }

  ngOnInit() {
    this.getBooks();
  }
}
