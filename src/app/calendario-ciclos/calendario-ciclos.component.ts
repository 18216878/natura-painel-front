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
  cod_re: number;
  nome_re: string;
  cod_gv: number;
  cod_setor: number;
  nome_setor: string;
  nome_gv: string;
  ciclos: number;
  dt_estatistica: string;
  ini_entrega_pedido_avon: string;
  fim_entrega_pedido_avon: string;
  vazio: string;
  id: number;
  dt_abertura: string;
  dt_fechamento: string;
  qtde_dias: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-calendario-ciclos',
  templateUrl: './calendario-ciclos.component.html',
  styleUrls: ['./calendario-ciclos.component.scss']
})
export class CalendarioCiclosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'cod_re',
    'nome_re',
    'cod_gv',
    'cod_setor',
    'nome_setor',
    'nome_gv',
    'ciclos',
    'dt_estatistica',
    'bloco',
    'sub_bloco',
    'vazio',
    'id',
    'dt_abertura',
    'dt_fechamento',
    'qtde_dias'
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

  public title: string = "Calendário de Ciclos";
  public cod_setor?: string = "";
  public nome_setor?: string = "";

  identificadores: string[] = ['Código do Setor', 'Nome do Setor'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      cod_setor:[''],
      nome_setor:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisarCodigoSetor() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetor = parseInt(this.cod_setor);

    this.painelService.getCalendarioCiclosCodSetor(codigoSetor).subscribe(
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

  pesquisarNomeSetor() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getCalendarioCiclosNomeSetor(this.nome_setor).subscribe(
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
