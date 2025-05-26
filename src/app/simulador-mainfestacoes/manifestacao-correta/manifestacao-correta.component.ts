import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manifestacao-correta',
  templateUrl: './manifestacao-correta.component.html',
  styleUrls: ['./manifestacao-correta.component.scss']
})
export class ManifestacaoCorretaComponent implements OnInit {

  manifestacaoCorretaDropDown: any[] = [];
  @Input() manifestacao_correta : string;
  @Input() id_manifestacao_correta: number;

  constructor(
  public dialogRef: MatDialogRef<ManifestacaoCorretaComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.manifestacaoCorretaDropDown = data.manifestacaoCorretaDropDown;
  }

  ngOnInit(): void {
  }

  selectedManifestacaoCorretaIndex: number | null = null;

  onToggleManifestacaoCorreta(index: number) {
    this.selectedManifestacaoCorretaIndex = index;
    this.dialogRef.close({
      manifestacao_correta: this.manifestacaoCorretaDropDown[index].manifestacao_correta,
      id_manifestacao_correta: this.manifestacaoCorretaDropDown[index].id
    });
  }

  selecionar(manifestacaoCorreta: string) {
    this.manifestacao_correta = manifestacaoCorreta;
  }

}
