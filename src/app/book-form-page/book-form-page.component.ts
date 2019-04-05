import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookServiceService } from '../book-service.service';
import Book from '../Model/book';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-book-form-page',
  templateUrl: './book-form-page.component.html',
  styleUrls: ['./book-form-page.component.sass']
})
export class BookFormPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private bookService: BookServiceService,
    private snackBar: MatSnackBar) {

    this.form = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
    });
  }

  save(): void {
    const book: Book = { ...this.form.value };

    const genres = this.form.get('genre').value.split(',');

    book.genre = genres;

    this.bookService.saveBook(book).subscribe(
      res => {
        this.openSnackBar('Cadastro efetuado com sucesso !', 'OK');
        this.location.back();
      },
      err => err.error.forEach(this.showMultipleSnackBar.bind(this))
    );
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
