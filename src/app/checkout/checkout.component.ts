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
  nr_pedido: number;
  nr_ciclo_pedido: number;
  vl_total_pedido: number;
  cod_consultora: number;
  nome_completo: string;
  cod_regiao_estrategica: number;
  regiao_estrategica: string;
  cod_gerencia_vendas: number;
  gerencia_vendas: string;
  cod_setor: number;
  setor: string;
  id_situacao_pedido: number;
  dt_ini_digitacao_pedido: string;
  dt_criacao_pedido: string;
  dt_finalizacao_pedido: string;
  meio_captacao: string;
  modalidade: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nr_pedido',
    'nr_ciclo_pedido',
    'vl_total_pedido',
    'cod_consultora',
    'nome_completo',
    'cod_regiao_estrategica',
    'regiao_estrategica',
    'cod_gerencia_vendas',
    'gerencia_vendas',
    'cod_setor',
    'setor',
    'id_situacao_pedido',
    'dt_ini_digitacao_pedido',
    'dt_criacao_pedido',
    'dt_finalizacao_pedido',
    'meio_captacao',
    'modalidade'
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
  formularioCheckout: FormGroup;
  user: string;

  public title: string = "Checkout - Pedido Cancelado";
  public cod_consultora?: string = "";
  public nr_pedido?: string = "";

  identificadores: string[] = ['Código da Consultora', 'Número do Pedido'];
  selecionado: string;
  
  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCheckout = this.formBuilder.group({
      selecionado:[''],
      cod_consultora:[''],      
      nr_pedido:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigoConsultora() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoConsultora = parseInt(this.cod_consultora);

    this.painelService.getNatCheckoutCodigo(codigoConsultora).subscribe(
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

  pesquisarNumeroPedido() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var numeroPedido = parseInt(this.nr_pedido);

    this.painelService.getNatCheckoutPedido(numeroPedido).subscribe(
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
    this.formularioCheckout.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }


}
