import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from '@angular/core';
import { MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
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

  @ViewChild('genreInput')
  genreInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto')
  matAutocomplete: MatAutocomplete;

  genresList: Array<string> = ['romance', 'drama', 'suspense', 'comedia', 'ficção', 'estudo', 'terror', 'historico'];

  filteredGenres: Observable<string[]>;

  genreCtrl = new FormControl();

  constructor() {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => genre ? this._filter(genre) : this.genresList.slice()));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.genresList.filter(genre => genre.toLowerCase().indexOf(filterValue) === 0);
  }

  // Todo: fazer uma validação decente

  handleSave(): void {
    const book = { ...this.book };

    book.genre.length >= 1 ? this.save.emit(book) : null;
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.book.genre.push(event.option.viewValue);

    this.genreInput.nativeElement.value = '';

    this.genreCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;

      const value = event.value;

      (value || '').trim() ? this.book.genre.push(value.trim()) : null;

      input ? input.value = '' : null;

      this.genreCtrl.setValue(null);
    }
  }

  remove(genre: any): void {
    const index = this.book.genre.indexOf(genre);

    index >= 0 ? this.book.genre.splice(index, 1) : null;
  }
}
