import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-tipo-defeito',
  templateUrl: './tipo-defeito.component.html',
  styleUrls: ['./tipo-defeito.component.scss']
})
export class TipoDefeitoComponent implements OnInit {

  tipoDefeitoDropDown: any[] = [];
  @Input() tipo_defeito : string;
  @Input() id_tipo_defeito: number;

  filtroTipoDefeito: string = '';

  constructor(
  public dialogRef: MatDialogRef<TipoDefeitoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.tipoDefeitoDropDown = data.tipoDefeitoDropDown;
  }

  ngOnInit(): void {
  }

  get tipoDefeitoFiltrado() {
    if (!this.filtroTipoDefeito) {
      return this.tipoDefeitoDropDown;
    }
    return this.tipoDefeitoDropDown.filter(td =>
      td.tipo_defeito && td.tipo_defeito.toLowerCase().includes(this.filtroTipoDefeito.toLowerCase())
    );
  }

  selectedTipoDefeitoIndex: number | null = null;

  onToggleTipoDefeito(index: number) {
    this.selectedTipoDefeitoIndex = index;
    this.dialogRef.close({
      tipo_defeito: this.tipoDefeitoDropDown[index].tipo_defeito,
      id_tipo_defeito: this.tipoDefeitoDropDown[index].id
    });
  }

  selecionar(tipoDefeito: string) {
    this.tipo_defeito = tipoDefeito;
  }

}
