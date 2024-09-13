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
  marca: string;
  descricao: string;
  linha_produto: string;
  categorizacao: string;
  status: string;
  codigo_venda: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-codigo-venda',
  templateUrl: './codigo-venda.component.html',
  styleUrls: ['./codigo-venda.component.scss']
})
export class CodigoVendaComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [
    'id',
    'marca',
    'descricao',
    'linha_produto',
    'categorizacao',
    'status',
    'codigo_venda'
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

  public title: string = "Código de Produtos";
  public marca?: string = "";
  public descricao?: string = "";
  public linha_produto?: string = "";
  public categorizacao?: string = "";

  identificadores: string[] = ['Marca', 'Descrição', 'Linha de Produto', 'Categorização'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      marca:[''],
      descricao:[''],
      linha_produto:[''],
      categorizacao:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  codigoVendaMarca() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getCodigoVendaMarca(this.marca).subscribe(
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

  codigoVendaDescricao() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getCodigoVendaDescricao(this.descricao).subscribe(
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

  codigoVendaLinhaProduto() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getCodigoVendaLinhaProduto(this.linha_produto).subscribe(
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

  codigoVendaCategorizacao() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getCodigoVendaCategorizacao(this.categorizacao).subscribe(
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
