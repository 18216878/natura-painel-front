import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  atraso_condicao: string;
  desconto: number;
  cyber: number;
  
}

var ELEMENT_DATA: PeriodicElement[] = [
  { atraso_condicao: '01-90 A VISTA', desconto: 0.5, cyber: 0.0017 },
  { atraso_condicao: '91-120 A VISTA', desconto: 0.8, cyber: 0.0007 },
  { atraso_condicao: '01-90 PARCELADO', desconto: 0.2, cyber: 0.0026 },
  { atraso_condicao: '91-120 PARCELADO', desconto: 0.4, cyber: 0.002 },
  { atraso_condicao: '121-180 PARCELADO ', desconto: 0.6, cyber: 0.0013 }
];

@Component({
  selector: 'app-alcada-acordo-diferenciado',
  templateUrl: './alcada-acordo-diferenciado.component.html',
  styleUrls: ['./alcada-acordo-diferenciado.component.scss']
})

export class AlcadaAcordoDiferenciadoComponent {

  displayedColumns: string[] = [
    'atraso_condicao',
    'desconto',
    'cyber'
  ];
  dataSource = ELEMENT_DATA;


}
