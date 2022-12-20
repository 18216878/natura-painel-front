import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cinco-parcelas',
  templateUrl: './cinco-parcelas.component.html',
  styleUrls: ['./cinco-parcelas.component.scss']
})
export class CincoParcelasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CincoParcelasComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
