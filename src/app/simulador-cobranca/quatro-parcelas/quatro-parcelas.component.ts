import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quatro-parcelas',
  templateUrl: './quatro-parcelas.component.html',
  styleUrls: ['./quatro-parcelas.component.scss']
})
export class QuatroParcelasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<QuatroParcelasComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
