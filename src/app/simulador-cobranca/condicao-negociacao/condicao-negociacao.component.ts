import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-condicao-negociacao',
  templateUrl: './condicao-negociacao.component.html',
  styleUrls: ['./condicao-negociacao.component.scss']
})
export class CondicaoNegociacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CondicaoNegociacaoComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
