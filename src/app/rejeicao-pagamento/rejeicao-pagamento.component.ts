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

export interface PeriodicElement {
  id: number;
  setor: number;
  regiao: string;
  divisao: string;
  registro: number;
  cpf_cnpj: string;
  nome: string;
  ativa: string;
  campanhas: string;
  valor: number;
  status: string;
  banco: string;
  agencia: string;
  modalidade: string;
  conta: string;
  tipo: string;
  data_reinforme: Date;
  data_pagamento: Date;
  observacao: string;
  atendimento_email: number;
  data_follow: Date;
  motivo_rejeicao: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-rejeicao-pagamento',
  templateUrl: './rejeicao-pagamento.component.html',
  styleUrls: ['./rejeicao-pagamento.component.scss']
})
export class RejeicaoPagamentoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'setor',
    'regiao',
    'divisao',
    'registro',
    'cpf_cnpj',
    'nome',
    'ativa',
    'campanhas',
    'valor',
    'status',
    'banco',
    'agencia',
    'modalidade',
    'conta',
    'tipo',
    'data_reinforme',
    'data_pagamento',
    'observacao',
    'atendimento_email',
    'data_follow',
    'motivo_rejeicao'
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
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioRejeicaoPagamento: FormGroup;
  user: string;

  public title: string = "Avon Rejeição de Pagamento";
  public registro?: string = "";
  public status?: string = "";
  public data?: string = "";
  public carregando: boolean;
  identificadores: string[] = ['Registro', 'Status', 'Data do Pagamento' ];
  selecionado: string;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioRejeicaoPagamento = this.formBuilder.group({
      selecionado:[''],
      registro:[''],      
      status:[''],      
      data:['']      
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarRegistro() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var reg = parseInt(this.registro);
    this.painelService.getAvonRejeicaoPagamentoRegistro(reg).subscribe(
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

  pesquisarStatus() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getAvonRejeicaoPagamentoStatus(this.status).subscribe(
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

  pesquisarData() {

    var data_pagamento = moment(this.data).format('YYYY-MM-DD');

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getAvonRejeicaoPagamentoData(data_pagamento).subscribe(
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
    this.formularioRejeicaoPagamento.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    this.registro = undefined;
    this.status = undefined;   
    this.data = undefined;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator; 
    
  }

}
