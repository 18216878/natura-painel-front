import { Component, NgZone, AfterViewInit, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelService } from '../excel.service';

export interface PeriodicElement {
  nr_pedido: string;
  data_pedido: string;
  nome_completo: string;
  telefone: string;
  email: string;
  status_pedido: string;
  valor_total: number;
  modalidade_pagamento: string;
  itens_pedido: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-vtex',
  templateUrl: './vtex.component.html',
  styleUrls: ['./vtex.component.scss']
})
export class VtexComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'nr_pedido',
    'data_pedido',
    'nome_completo',
    'telefone',
    'email',
    'status_pedido',
    'valor_total',
    'modalidade_pagamento',
    'itens_pedido'
  ];


  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public pesquisa_efetuada: boolean = false;

  constructor(
    private _ngZone: NgZone, 
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private excelService: ExcelService,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  storage: Storage;
  router: Router;
  formularioVtex: FormGroup;
  user: string;

  public title: string = "Histórico VTEX";
  public nr_pedido?: string = "";

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioVtex = this.formBuilder.group({
      nr_pedido:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisaPedido(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getVtex(this.nr_pedido).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action);
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';     
        var action = 'Fechar'     
        this._snackBar.open(message, action);
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioVtex.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

}
