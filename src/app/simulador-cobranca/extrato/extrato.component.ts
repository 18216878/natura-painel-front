import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export interface PeriodicElement {
  titulo: string;
  item: string;
  valor: string;
  data_vencimento: string;
  atraso: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {titulo: "1608613138", item: "3", valor: "R$ 669,66", data_vencimento: "16/11/2022", atraso: 29},
  {titulo: "1610666004", item: "3", valor: "R$ 708,91", data_vencimento: "28/11/2022", atraso: 17},
  {titulo: "1612094883", item: "2", valor: "R$ 500,90", data_vencimento: "29/11/2022", atraso: 16}
]

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;

  displayedColumns : string[] = [
    'titulo',
    'item',
    'valor',
    'data_vencimento',
    'atraso'

  ];

  dataSource = ELEMENT_DATA;

  

  constructor() { }

  ngOnInit(): void {

  }

  downloadExtrato(){
    const moment = require('moment');
    var arquivo = "79622690 - " + moment(new Date()).format('YYYYMMDD_HHMMSS') + ".pdf"

   
    
  }

}
