import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-descricao',
  templateUrl: './descricao.component.html',
  styleUrls: ['./descricao.component.scss']
})
export class DescricaoComponent implements OnInit {

  descricaoDropDown: any[] = [];
  @Input() descricao : string;
  @Input() id_descricao: number;

  filtroDescricao: string = '';

  constructor(
  public dialogRef: MatDialogRef<DescricaoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.descricaoDropDown = data.descricaoDropDown;
  }

  ngOnInit(): void {
  }

  get descricaoFiltrada() {
    if (!this.filtroDescricao) {
      return this.descricaoDropDown;
    }
    return this.descricaoDropDown.filter(d =>
      d.descricao && d.descricao.toLowerCase().includes(this.filtroDescricao.toLowerCase())
    );
  }

  selectedDescricaoIndex: number | null = null;

  onToggleDescricao(index: number) {
    this.selectedDescricaoIndex = index;
    this.dialogRef.close({
      descricao: this.descricaoDropDown[index].descricao,
      id_descricao: this.descricaoDropDown[index].id
    });
  }

  selecionar(descricao: string) {
    this.descricao = descricao;
  }

}
