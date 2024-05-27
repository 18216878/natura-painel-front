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
  data_pedido: string;
  cod_cn: string;
  pedido: number;
  cod_setor: string;
  cod_grupo: string;
  cod_re: string;
  ano_ciclo: number;
  nr_ciclo: number;
  nome: string;
  telefone: string;
  status_cn_pedido: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-rio-grande-do-sul',
  templateUrl: './rio-grande-do-sul.component.html',
  styleUrls: ['./rio-grande-do-sul.component.scss']
})
export class RioGrandeDoSulComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [
    'id',
    'data_pedido',
    'cod_cn',
    'pedido',
    'cod_setor',
    'cod_grupo',
    'cod_re',
    'ano_ciclo',
    'nr_ciclo',
    'nome',
    'telefone',
    'status_cn_pedido'
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
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  storage: Storage;
  router: Router;
  formularioCalendarioCiclos: FormGroup;
  user: string;

  public title: string = "Lista Pedidos Rio Grande do Sul";
  public cod_cn?: string = "";
  public numero_pedido?: string = "";

  identificadores: string[] = ['Código da Consultora', 'Número do Pedido'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      cod_cn:[''],
      numero_pedido:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisarCodigoCn() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getNatRioGrandeDoSulCodigoConsultora(this.cod_cn).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action, {
            duration: 3000
          });
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action, {
          duration: 3000
        });
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  pesquisarNomeSetor() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var pedido = parseInt(this.numero_pedido);

    this.painelService.getNatRioGrandeDoSulNumeroPedido(pedido).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action, {
            duration: 3000
          });
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action, {
          duration: 3000
        });
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioCalendarioCiclos.reset();
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
