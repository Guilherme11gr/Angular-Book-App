import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { BookModalFormComponent } from './book-modal-form/book-modal-form.component';
import Book from './Model/book';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirm(message: string): Observable<boolean> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    dialogConfig.data = { message };

    const dialogRef = this.dialog.open(DialogBodyComponent, dialogConfig);

    return dialogRef.afterClosed();
  }

  openFormModal(book: Book): Observable<any> {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;

    dialogConfig.data = { book };

    dialogConfig.width = '50%';

    dialogConfig.minWidth = '340px';

    const dialogRef = this.dialog.open(BookModalFormComponent, dialogConfig);

    return dialogRef.afterClosed();
  }
}
