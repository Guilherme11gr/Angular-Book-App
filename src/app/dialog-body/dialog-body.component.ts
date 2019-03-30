import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.sass']
})
export class DialogBodyComponent implements OnInit {

  message: string;

  constructor(
    private dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.message = data.message;
  }

  close() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }

  ngOnInit() {
  }

}
