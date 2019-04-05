import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import Book from '../Model/book';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.sass']
})
export class BookCardComponent implements OnInit {

  @Input()
  books: Array<Book>;

  @Output()
  delete: EventEmitter<Book> = new EventEmitter<Book>();

  @Output()
  edit: EventEmitter<Book> = new EventEmitter<Book>();

  constructor(private dialogService: DialogService) { }

  deleteBook(book: Book): void {
    this.dialogService.confirm(`Deseja realmente excluir o livro: ${book.title}`)
      .subscribe(confirm => confirm ? this.delete.emit(book) : null);
  }

  editBook(book: Book): void {
    this.edit.emit(book);
  }

  ngOnInit() { }

}
