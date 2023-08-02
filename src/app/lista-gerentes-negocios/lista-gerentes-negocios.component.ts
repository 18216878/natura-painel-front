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
  cd_re: number;
  nome_re: string;
  cd_gv: number;
  nome_gv: string;
  cod_do_gv: number;
  nome_do_gv: string;
  cd_setor: number;
  nome_setor: string;
  gdn: number;
  nome_gdn: string;
  email_gdn: string;
  tel_preferencial_gdn: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-lista-gerentes-negocios',
  templateUrl: './lista-gerentes-negocios.component.html',
  styleUrls: ['./lista-gerentes-negocios.component.scss']
})
export class ListaGerentesNegociosComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cd_re',
    'nome_re',
    'cd_gv',
    'nome_gv',
    'cod_do_gv',
    'nome_do_gv',
    'cd_setor',
    'nome_setor',
    'gdn',
    'nome_gdn',
    'email_gdn',
    'tel_preferencial_gdn'
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
  formularioListaGerentesNegocios: FormGroup;
  user: string;

  public title: string = "Lista de Contatos - Gerentes de Negócios";
  public cd_gv?: string = "";
  public nome_gv?: string = "";
  public gdn?: string = "";
  public nome_gdn?: string = "";
  public tel_preferencial_gdn?: string = "";
  public cd_setor?: string = "";

  identificadores: string[] = ['Código da GV', 'Nome da GV', 'Código da GDN', 'Nome da GDN', 'Telefone da GDN', 'Código do Setor'];
  selecionado: string;
  
  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioListaGerentesNegocios = this.formBuilder.group({
      selecionado:[''],
      cd_gv:[''],      
      nome_gv:[''],      
      gdn:[''],      
      nome_gdn:[''],
      tel_preferencial_gdn:[''],
      cd_setor:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigoGV() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGv = parseInt(this.cd_gv);

    this.painelService.getNatListaGerentesNegociosCodigoGv(codigoGv).subscribe(
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

  pesquisarNomeGv() {

    this.pesquisa_efetuada = true;
    this.carregando = true;
    
    this.painelService.getNatListaGerentesNegociosNomeGv(this.nome_gv).subscribe(
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

  pesquisarCodigoGDN() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGdn = parseInt(this.gdn);

    this.painelService.getNatListaGerentesNegociosGdn(codigoGdn).subscribe(
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

  pesquisarNomeGdn() {

    this.pesquisa_efetuada = true;
    this.carregando = true;
    
    this.painelService.getNatListaGerentesNegociosNomeGdn(this.nome_gdn).subscribe(
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

  pesquisarTelefoneGdn() {

    this.pesquisa_efetuada = true;
    this.carregando = true;
    
    this.painelService.getNatListaGerentesNegociosTelefoneGdn(this.tel_preferencial_gdn).subscribe(
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

  pesquisarCodigoSetor() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetor = parseInt(this.cd_setor);

    this.painelService.getNatListaGerentesSetor(codigoSetor).subscribe(
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
    this.formularioListaGerentesNegocios.reset();
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
