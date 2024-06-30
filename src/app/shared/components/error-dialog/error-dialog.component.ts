import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  //injetando o tipo do mat-dialog-data e atribuindo a variável data
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }

}
