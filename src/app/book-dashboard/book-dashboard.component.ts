import { Component, OnInit } from '@angular/core';
import Book from '../Model/book';
import { BookServiceService } from '../book-service.service';
import { DialogService } from '../dialog.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.sass']
})
export class BookDashboardComponent implements OnInit {

  durationInSeconds = 3;
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
      res => {
        if (res.error) {
          res.error.forEach(this.showMultipleSnackBar.bind(this));
        } else if (res !== 'close') {
          this.openSnackBar('Edição efetuada com sucesso !', 'OK');
          this.getBooks();
        }
      }
    );
  }

  showMultipleSnackBar({ message }, i: number) {
    i === 0 ? this.openSnackBar(message, 'OK') :
      setTimeout(() => this.openSnackBar(message, 'OK'), this.durationInSeconds * 1000);
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
