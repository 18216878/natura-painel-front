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
  cd_pessoa: number;
  uf_municipio: string;
  estrutura: string;
  agrup_origem: string;
  fechamento_origem: string;
  agrup_destino: string;
  fechamento_destino: string;
  referencia: string;
  migracao_no: string;
  data_migracao: string;
  cd_tipo_papel: number;
  cd_setor: number;
  cd_grupo_atual: number;
  nm_cep: string;
  alocado: string;
  cd_grupo_para: number;
  cd_setor_destino: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
  styleUrls: ['./movimentacao.component.scss']
})
export class MovimentacaoComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'cd_pessoa',
    'uf_municipio',
    'estrutura',
    'agrup_origem',
    'fechamento_origem',
    'agrup_destino',
    'fechamento_destino',
    'referencia',
    'migracao_no',
    'data_migracao',
    'cd_tipo_papel',
    'cd_setor',
    'cd_grupo_atual',
    'nm_cep',
    'alocado',
    'cd_grupo_para',
    'cd_setor_destino'
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
  formularioMigradasAvon: FormGroup;
  user: string;

  public title: string = "Movimentação ELO";
  public cd_pessoa?: string = "";

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioMigradasAvon = this.formBuilder.group({
      cd_pessoa:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisaCodigoConsultora(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoPessoa = parseInt(this.cd_pessoa);

    this.painelService.getNatMovimentacaoCodigoConsultora(codigoPessoa).subscribe(
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
    this.formularioMigradasAvon.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

}
