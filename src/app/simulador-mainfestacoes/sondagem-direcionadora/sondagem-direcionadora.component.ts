import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sondagem-direcionadora',
  templateUrl: './sondagem-direcionadora.component.html',
  styleUrls: ['./sondagem-direcionadora.component.scss']
})
export class SondagemDirecionadoraComponent implements OnInit {

  sondagemDropDOwn: any[] = [];
  sondagemOriginal: any[] = [];
  @Input() sondagem_direcionadora : string;
  @Input() id_sondagem_direcionadora: number;

  filtroSondagem: string = '';

  constructor(
  public dialogRef: MatDialogRef<SondagemDirecionadoraComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.sondagemDropDOwn = data.sondagemDropDOwn;
    this.sondagemOriginal = [...data.sondagemDropDOwn];
  }

  ngOnInit(): void {
  }

  get sondagemFiltrada() {
    if (!this.filtroSondagem) {
      return this.sondagemDropDOwn;
    }
    return this.sondagemDropDOwn.filter(s =>
      s.sondagem_direcionadora && s.sondagem_direcionadora.toLowerCase().includes(this.filtroSondagem.toLowerCase())
    );
  }

  selectedSondagemDirecionadoraIndex: number | null = null;

  onToggleSondagemDirecionadora(index: number) {
    this.selectedSondagemDirecionadoraIndex = index;
    const itemFiltrado = this.sondagemFiltrada[index];
    const itemOriginal = this.sondagemOriginal.find(s => s.id === itemFiltrado.id);
    this.dialogRef.close({
      sondagem_direcionadora: itemOriginal?.sondagem_direcionadora,
      id_sondagem_direcionadora: itemOriginal?.id
    });
  }

  selecionar(sondagemDirecionadora: string) {
    this.sondagem_direcionadora = sondagemDirecionadora;
  }

}
