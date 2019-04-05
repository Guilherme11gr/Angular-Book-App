import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Book from '../Model/book';
import { BookServiceService } from '../book-service.service';

@Component({
  selector: 'app-book-modal-form',
  templateUrl: './book-modal-form.component.html',
  styleUrls: ['./book-modal-form.component.sass']
})
export class BookModalFormComponent implements OnInit {
  book: Book;

  constructor(
    private bookService: BookServiceService,
    private dialogRef: MatDialogRef<BookModalFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.book = this.data.book;
  }

  close() {
    this.dialogRef.close('close');
  }

  save(book: Book) {
    const { _id } = this.book;
    this.bookService.updateBook(_id, book).subscribe(
      res => this.dialogRef.close(res),
      err => this.dialogRef.close(err)
    );
  }
}
