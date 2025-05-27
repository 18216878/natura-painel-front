import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-tipo-defeito',
  templateUrl: './tipo-defeito.component.html',
  styleUrls: ['./tipo-defeito.component.scss']
})
export class TipoDefeitoComponent implements OnInit {

  tipoDefeitoDropDown: any[] = [];
  tipoDefeitoOriginal: any[] = [];
  @Input() tipo_defeito : string;
  @Input() id_tipo_defeito: number;

  filtroTipoDefeito: string = '';

  constructor(
  public dialogRef: MatDialogRef<TipoDefeitoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.tipoDefeitoDropDown = data.tipoDefeitoDropDown;
    this.tipoDefeitoOriginal = [...data.tipoDefeitoDropDown];
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
    const itemFiltrado = this.tipoDefeitoFiltrado[index];
    const itemOriginal = this.tipoDefeitoOriginal.find(td => td.id === itemFiltrado.id);
    this.dialogRef.close({
      tipo_defeito: itemOriginal?.tipo_defeito,
      id_tipo_defeito: itemOriginal?.id
    });
  }

  selecionar(tipoDefeito: string) {
    this.tipo_defeito = tipoDefeito;
  }

}
