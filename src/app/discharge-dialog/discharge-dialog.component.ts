import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";

@Component({
  selector: 'app-discharge-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './discharge-dialog.component.html',
  styleUrl: './discharge-dialog.component.css'
})
export class DischargeDialogComponent {

  constructor(public dialogRef: MatDialogRef<DischargeDialogComponent>) {
  }

  onDismiss() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
}
