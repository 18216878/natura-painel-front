import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-local-defeito',
  templateUrl: './local-defeito.component.html',
  styleUrls: ['./local-defeito.component.scss']
})
export class LocalDefeitoComponent implements OnInit {

  localDefeitoDropDown: any[] = [];
  localDefeitoOriginal: any[] = [];
  @Input() local_defeito : string;
  @Input() id_local_defeito: number;

  filtroLocalDefeito: string = '';

  constructor(
    public dialogRef: MatDialogRef<LocalDefeitoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.localDefeitoDropDown = data.localDefeitoDropDown;
      this.localDefeitoOriginal = [...data.localDefeitoDropDown];
    }

  ngOnInit(): void {
  }

  get localDefeitoFiltrado() {
    if (!this.filtroLocalDefeito) {
      return this.localDefeitoDropDown;
    }
    return this.localDefeitoDropDown.filter(ld =>
      ld.local_defeito && ld.local_defeito.toLowerCase().includes(this.filtroLocalDefeito.toLowerCase())
    );
  }

  selectedLocalDefeitoIndex: number | null = null;

  onToggleLocalDefeito(index: number) {
    this.selectedLocalDefeitoIndex = index;
    const itemFiltrado = this.localDefeitoFiltrado[index];
    const itemOriginal = this.localDefeitoOriginal.find(ld => ld.id === itemFiltrado.id);
    this.dialogRef.close({
      local_defeito: itemOriginal?.local_defeito,
      id_local_defeito: itemOriginal?.id
    });
  }

  selecionar(localDefeito: string) {
    this.local_defeito = localDefeito;
  }

}
