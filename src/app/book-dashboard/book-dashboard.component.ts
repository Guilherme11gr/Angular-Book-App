import { Component, OnInit } from '@angular/core';
import Book from '../Model/book';
import { BookServiceService } from '../book-service.service';
import { DialogService } from '../dialog.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { genres } from '../selectsValues';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.sass']
})
export class BookDashboardComponent implements OnInit {

  durationInSeconds = 3;
  books: Book[];
  genres: Array<any> = genres;
  authors: Array<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookService: BookServiceService,
    private dialogService: DialogService,
    private snackBar: MatSnackBar) { }

  getBooks(param?: any): void {
    this.bookService.getBooks(param).subscribe(books => {
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

  selectionGenre({ value }) {
    this.router.navigate(['/dashboard'], { queryParams: { genre: value } });
  }

  selectionAuthor({ value }) {
    this.router.navigate(['/dashboard'], { queryParams: { author: value } });
  }

  ngOnInit() {
    this.bookService.getAuthors().subscribe(authors => this.authors = authors);

    this.activatedRoute.queryParamMap
      .subscribe(params => {
        const param = params.get('genre') || params.get('author');

        const [key] = params.keys;

        this.getBooks({ key, value: param });
      });
  }
}
