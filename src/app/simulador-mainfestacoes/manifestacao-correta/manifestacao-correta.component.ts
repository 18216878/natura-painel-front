import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manifestacao-correta',
  templateUrl: './manifestacao-correta.component.html',
  styleUrls: ['./manifestacao-correta.component.scss']
})
export class ManifestacaoCorretaComponent implements OnInit {

  manifestacaoCorretaDropDown: any[] = [];
  manifestacaoCorretaOriginal: any[] = [];
  @Input() manifestacao_correta : string;
  @Input() id_manifestacao_correta: number;

  filtroManifestacaoCorreta: string = '';

  constructor(
  public dialogRef: MatDialogRef<ManifestacaoCorretaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.manifestacaoCorretaDropDown = data.manifestacaoCorretaDropDown;
    this.manifestacaoCorretaOriginal = [...data.manifestacaoCorretaDropDown];
  }

  ngOnInit(): void {
  }

  get manifestacaoCorretaFiltrada() {
    if (!this.filtroManifestacaoCorreta) {
      return this.manifestacaoCorretaDropDown;
    }
    return this.manifestacaoCorretaDropDown.filter(mc =>
      mc.manifestacao_correta && mc.manifestacao_correta.toLowerCase().includes(this.filtroManifestacaoCorreta.toLowerCase())
    );
  }

  selectedManifestacaoCorretaIndex: number | null = null;

  onToggleManifestacaoCorreta(index: number) {
    this.selectedManifestacaoCorretaIndex = index;
    const itemFiltrado = this.manifestacaoCorretaFiltrada[index];
    const itemOriginal = this.manifestacaoCorretaOriginal.find(mc => mc.id === itemFiltrado.id);
    this.dialogRef.close({
      manifestacao_correta: itemOriginal?.manifestacao_correta,
      id_manifestacao_correta: itemOriginal?.id
    });
  }

  selecionar(manifestacaoCorreta: string) {
    this.manifestacao_correta = manifestacaoCorreta;
  }

}
