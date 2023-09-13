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
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  origem: string;
  cod_pessoa: number;
  nome_completo_pessoa: number;
  cod_regiao_estrategica: number;
  cod_gerencia_venda: string;
  cod_setor: number;
  cod_grupo: number;
  cod_setor_grupo: string;
  cod_nivel_atual: number;
  uf_municipio: string;
  bairro: string;
  cod_regiao_estrategica_elo: number;
  cod_gerencia_venda_elo: number;
  cod_setor_elo: number;
  cod_grupo_elo: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-base-alocacao',
  templateUrl: './base-alocacao.component.html',
  styleUrls: ['./base-alocacao.component.scss']
})
export class BaseAlocacaoComponent implements OnInit {

  displayedColumns: string[] = [
    'origem',
    'cod_pessoa',
    'nome_completo_pessoa',
    'cod_regiao_estrategica',
    'cod_gerencia_venda',
    'cod_setor',
    'cod_grupo',
    'cod_setor_grupo',
    'cod_nivel_atual',
    'uf_municipio',
    'bairro',
    'cod_regiao_estrategica_elo',
    'cod_gerencia_venda_elo',
    'cod_setor_elo',
    'cod_grupo_elo'  
  ];

  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  faFileExcel = faFileExcel;
  
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

  storage: Storage;
  router: Router;
  formularioBaseAlocacao: FormGroup;
  user: string;

  public title: string = "Movimentação de Setor e Grupo (ELO)";
  public cod_pessoa?: string = "";
  public cod_regiao_estrategica?: string = "";
  public cod_gerencia_venda?: string = "";
  public cod_setor?: string = "";
  public cod_grupo?: string = "";
  public cod_regiao_estrategica_elo?: string = "";
  public cod_gerencia_venda_elo?: string = "";
  public cod_setor_elo?: string = "";
  public cod_grupo_elo?: string = "";

  identificadores: string[] = [
          'Código Pessoa',
          'Código Gerência Venda',
          'Código Setor',
          'Código Grupo',
          'ELO - Código Gerência Venda',
          'ELO - Código Setor',
          'ELO - Código Grupo'
  ];
  selecionado: string;
  
  public carregando: boolean;
  public carregandoExcel: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioBaseAlocacao = this.formBuilder.group({
      selecionado:[''],
      cod_pessoa:[''],      
      cod_regiao_estrategica:[''],      
      cod_gerencia_venda:[''],      
      cod_setor:[''],
      cod_grupo:[''],
      cod_regiao_estrategica_elo:[''],      
      cod_gerencia_venda_elo:[''],      
      cod_setor_elo:[''],
      cod_grupo_elo:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisaCodigoPessoa(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoPessoa = parseInt(this.cod_pessoa);

    this.painelService.getNatBaseAlocacaoCodigoPessoa(codigoPessoa).subscribe(
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

  pesquisaCodigoRegiaoEstrategica(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoRegiaoEstrategica = parseInt(this.cod_regiao_estrategica);

    this.painelService.getNatBaseAlocacaoCodigoRegiaoEstrategica(codigoRegiaoEstrategica).subscribe(
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

  pesquisaCodigoGerenciaVenda(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGerenciaVenda = parseInt(this.cod_gerencia_venda);

    this.painelService.getNatBaseAlocacaoCodigoGerenciaVenda(codigoGerenciaVenda).subscribe(
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

  pesquisarCodigoSetor(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetor = parseInt(this.cod_setor);

    this.painelService.getNatBaseAlocacaoCodigoSetor(codigoSetor).subscribe(
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

  pesquisaCodigoGrupo(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGrupo = parseInt(this.cod_grupo);

    this.painelService.getNatBaseAlocacaoCodigoGrupo(codigoGrupo).subscribe(
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

  pesquisaEloCodigoRegiaoEstrategica(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoRegiaoEstrategicaElo = parseInt(this.cod_regiao_estrategica_elo);

    this.painelService.getNatBaseAlocacaoEloCodigoRegiaoEstrategica(codigoRegiaoEstrategicaElo).subscribe(
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

  pesquisaCodigoGerenciaVendaElo(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGerenciaVendaElo = parseInt(this.cod_gerencia_venda_elo);

    this.painelService.getNatBaseAlocacaoEloCodigoGerenciaVenda(codigoGerenciaVendaElo).subscribe(
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

  pesquisarCodigoSetorElo(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetorElo = parseInt(this.cod_setor_elo);

    this.painelService.getNatBaseAlocacaoEloCodigoSetor(codigoSetorElo).subscribe(
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

  pesquisaCodigoGrupoElo(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoGrupoElo = parseInt(this.cod_grupo_elo);

    this.painelService.getNatBaseAlocacaoEloCodigoGrupo(codigoGrupoElo).subscribe(
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

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioBaseAlocacao.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  exportarBaseExcel(){
    this.carregandoExcel = true;

    if(this.dataSource.length === 0){
      var message = 'Sem dados a serem exportados';
      var action = '❌'
      this._snackBar.open(message, action); 
      this.carregandoExcel = false;
    }
    else {
      
      this.excelService.generateExcel(this.dataSource);
      this.carregandoExcel = false;
      
    }
  }

}
