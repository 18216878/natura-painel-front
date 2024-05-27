import { Component, NgZone, AfterViewInit, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import 'moment/locale/pt-br';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  cod_pessoa: number;
  cod_tipo_papel: number;
  tipo_papel: string;
  nm_doc_pessoa: number;
  cod_gerencia_venda: number;
  dc_gerencia_venda: string;
  cod_setor: number;
  dc_setor: string;
  cod_grupo: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-seguranca-dados',
  templateUrl: './seguranca-dados.component.html',
  styleUrls: ['./seguranca-dados.component.scss']
})
export class SegurancaDadosComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'cod_pessoa',
    'cod_tipo_papel',
    'tipo_papel',
    'nm_doc_pessoa',
    'cod_gerencia_venda',
    'dc_gerencia_venda',
    'cod_setor',
    'dc_setor',
    'cod_grupo'
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
  formularioPilotoSegurancaAtualizacaoDados: FormGroup;
  user: string;

  public title: string = "Piloto de Segurança de Atualização de Dados Cadastrais";
  public cod_pessoa?: string = "";
  public cod_setor?: string = "";

  identificadores: string[] = ['Código da Consultora', 'Código do Setor'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioPilotoSegurancaAtualizacaoDados = this.formBuilder.group({
      selecionado:[''],
      cod_pessoa:[''],
      cod_setor:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigoPessoa() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoPessoa = parseInt(this.cod_pessoa);

    this.painelService.getNatPilotoGvAlecrimCodigoPessoa(codigoPessoa).subscribe(
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

    var codigoSetor = parseInt(this.cod_setor);

    this.painelService.getNatPilotoGvAlecrimCodigoSetor(codigoSetor).subscribe(
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
    this.formularioPilotoSegurancaAtualizacaoDados.reset();
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
