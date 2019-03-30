import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import Book from '../Model/book';

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

  constructor(private dialog: MatDialog) { }

  deleteBook(book: Book): void {
    this.confirmDelete(book.title).subscribe(confirm => confirm ? this.delete.emit(book) : null);
  }

  confirmDelete(bookTitle: string): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    dialogConfig.data = { message: `Deseja realmente excluir o livro: ${bookTitle}` };

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

  ngOnInit() {
  }

}
