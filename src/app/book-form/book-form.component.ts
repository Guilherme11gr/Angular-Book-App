import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Book from '../Model/book';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent implements OnInit {

  @Output()
  save: EventEmitter<Book> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  @Input()
  book: Book;

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  // Todo: fazer uma validação decente

  handleSave(): void {
    const genre = this.form.get('genre').value;

    const book = { ...this.form.value };

    book.genre = Array.isArray(genre) ? genre : genre.toLowerCase().split(',');

    if (this.form.valid) {
      this.save.emit(book);
    }

  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnInit() {
    this.form = this.fb.group({
      description: [this.book ? this.book.description : '', Validators.required],
      title: [this.book ? this.book.title : '', Validators.required],
      author: [this.book ? this.book.author : '', Validators.required],
      genre: [this.book ? this.book.genre : '', Validators.required],
    });
  }

}
