import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reembolso-form-dialog',
  templateUrl: './reembolso-form-dialog.component.html',
  styleUrls: ['./reembolso-form-dialog.component.scss']
})
export class ReembolsoFormDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ReembolsoFormDialogComponent>,
    ) { }

    ngOnInit(): void {
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

}
