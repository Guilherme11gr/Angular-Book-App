import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Book from '../Model/book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-book-modal-form',
  templateUrl: './book-modal-form.component.html',
  styleUrls: ['./book-modal-form.component.sass']
})
export class BookModalFormComponent {

  message: string;
  description: string;
  id: string;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private dialogRef: MatDialogRef<BookModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    const { _id, description, title, author, genre } = data.book;

    this.id = _id;

    this.form = this.fb.group({
      description: [description, Validators.required],
      title: [title, Validators.required],
      author: [author, Validators.required],
      genre: [genre, Validators.required],
    });
  }

  close() {
    this.dialogRef.close('close');
  }

  save() {
    if (this.form.valid) {
      const oldGenres = this.form.get('genre').value;

      const newGenres = oldGenres.split(',');

      const book: Book = { ...this.form.value };

      book.genre = newGenres;

      this.bookService.updateBook(this.id, book).subscribe(
        res => this.dialogRef.close(res),
        err => this.dialogRef.close(err)
      );
    }
  }
}
