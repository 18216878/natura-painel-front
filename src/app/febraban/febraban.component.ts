import { Component, NgZone, OnInit, AfterViewInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  id: number;
  empresa: number;
  cod_cn: string;
  titulo: number;
  exercicio: number;
  item: number;
  nosso_numero: number;
  chave: string;
  vencimento: string;
  status_titulo: string;
  bloqueio: string;
  valor: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-febraban',
  templateUrl: './febraban.component.html',
  styleUrls: ['./febraban.component.scss']
})
export class FebrabanComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'empresa',
    'cod_cn',
    'titulo',
    'exercicio',
    'item',
    'nosso_numero',
    'chave',
    'vencimento',
    'status_titulo',
    'bloqueio',
    'valor'
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
  formularioFebraban: FormGroup;
  user: string;

  public title: string = "Título com erro (FEBRABAN)";
  public cod_cn?: string = "";
  public titulo?: string = "";
  identificadores: string[] = ['Código da Consultora', 'Título'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioFebraban = this.formBuilder.group({
      selecionado:[''],
      cod_cn:[''],
      titulo:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }


  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarTitulosFebrabanCodigoCn() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getTitulosFebrabanCodigoCn(this.cod_cn).subscribe(
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

  pesquisarTitulosFebrabanTitulo() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var titulo = parseInt(this.titulo)

    this.painelService.getTitulosFebrabanTitulo(titulo).subscribe(
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
    this.formularioFebraban.reset();
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
