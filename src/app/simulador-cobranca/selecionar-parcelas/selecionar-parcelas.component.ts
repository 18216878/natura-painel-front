import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-parcelas',
  templateUrl: './selecionar-parcelas.component.html',
  styleUrls: ['./selecionar-parcelas.component.scss']
})
export class SelecionarParcelasComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelecionarParcelasComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
