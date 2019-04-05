import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BookServiceService } from '../book-service.service';
import { MatSnackBar } from '@angular/material';
import Book from '../Model/book';

@Component({
  selector: 'app-book-form-page',
  templateUrl: './book-form-page.component.html',
  styleUrls: ['./book-form-page.component.sass']
})
export class BookFormPageComponent implements OnInit {

  constructor(
    private location: Location,
    private bookService: BookServiceService,
    private snackBar: MatSnackBar) { }

  save(book: Book): void {
    this.bookService.saveBook(book).subscribe(
      res => {
        this.openSnackBar('Cadastro efetuado com sucesso !', 'OK');
        this.location.back();
      },
      err => err.error.forEach(this.showMultipleSnackBar.bind(this))
    );
  }

  cancel(): void {
    this.location.back();
  }

  showMultipleSnackBar({ message }, i: number) {
    i === 0 ? this.openSnackBar(message, 'OK') :
      setTimeout(() => this.openSnackBar(message, 'OK'), 3 * 1000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3 * 1000
    });
  }

  ngOnInit() { }

}
