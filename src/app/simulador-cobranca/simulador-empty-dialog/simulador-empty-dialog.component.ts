import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CondicaoNegociacaoComponent } from '../condicao-negociacao/condicao-negociacao.component';

@Component({
  selector: 'app-simulador-empty-dialog',
  templateUrl: './simulador-empty-dialog.component.html',
  styleUrls: ['./simulador-empty-dialog.component.scss']
})
export class SimuladorEmptyDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CondicaoNegociacaoComponent>,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
