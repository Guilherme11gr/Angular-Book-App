import { Component, EventEmitter, Output, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import Book from '../Model/book';

// tslint:disable: no-unused-expression

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.sass']
})
export class BookFormComponent {
  visible = true;

  selectable = true;

  removable = true;

  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Output()
  save: EventEmitter<Book> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  @Input()
  book: Book;

  constructor() { }

  // Todo: fazer uma validação decente

  handleSave(): void {
    const book = { ...this.book };

    book.genre.length >= 1 ? this.save.emit(book) : null;
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  add(event: MatChipInputEvent): void {
    if (this.book.genre.length || this.book.genre.length <= 3) {
      const input = event.input;

      const value = event.value;

      (value || '').trim() ? this.book.genre.push(value.trim()) : null;

      input ? input.value = '' : null;
    }
  }

  remove(genre: any): void {
    const index = this.book.genre.indexOf(genre);

    index >= 0 ? this.book.genre.splice(index, 1) : null;
  }
}
