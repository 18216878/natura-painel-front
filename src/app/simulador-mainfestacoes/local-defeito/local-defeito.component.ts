import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-local-defeito',
  templateUrl: './local-defeito.component.html',
  styleUrls: ['./local-defeito.component.scss']
})
export class LocalDefeitoComponent implements OnInit {

  localDefeitoDropDown: any[] = [];
  @Input() local_defeito : string;
  @Input() id_local_defeito: number;

  constructor(
    public dialogRef: MatDialogRef<LocalDefeitoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.localDefeitoDropDown = data.localDefeitoDropDown;
    }

  ngOnInit(): void {
  }

  selectedLocalDefeitoIndex: number | null = null;

  onToggleLocalDefeito(index: number) {
    this.selectedLocalDefeitoIndex = index;
    this.dialogRef.close({
      local_defeito: this.localDefeitoDropDown[index].local_defeito,
      id_local_defeito: this.localDefeitoDropDown[index].id
    });
  }

  selecionar(localDefeito: string) {
    this.local_defeito = localDefeito;
  }

}

