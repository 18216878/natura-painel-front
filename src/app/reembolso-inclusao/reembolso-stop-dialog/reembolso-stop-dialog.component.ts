import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reembolso-stop-dialog',
  templateUrl: './reembolso-stop-dialog.component.html',
  styleUrls: ['./reembolso-stop-dialog.component.scss']
})
export class ReembolsoStopDialogComponent implements OnInit {

  constructor(
        public dialogRef: MatDialogRef<ReembolsoStopDialogComponent>,
      ) { }

      ngOnInit(): void {
      }

      closeDialog(): void {
        this.dialogRef.close();
      }
}
