import { Component, NgZone, AfterViewInit, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';
import { PainelService } from '../../painel.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  cliente: string;
  nr_documento: string;
  nr_ocorrencia: string;
  data_criacao: string;
  origem: string;
  data_sla: string;
  status_atividade: string;
  nome_favorecido: string;
  endereco_favorecido_rua: string;
  endereco_favorecido_cidade: string;
  endereco_favorecido_cep: string;
  codigo_banco: number;
  nome_banco: string;
  agencia_numero: string;
  agencia_digito: string;
  conta_numero: string;
  conta_digito: string;
  cpf_favorecido: string;
  valor: number;
  base_origem: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-reembolso-pesquisa',
  templateUrl: './reembolso-pesquisa.component.html',
  styleUrls: ['./reembolso-pesquisa.component.scss']
})
export class ReembolsoPesquisaComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = [
    'cliente',
    'nr_documento',
    'nr_ocorrencia',
    'data_criacao',
    'origem',
    'data_sla',
    'status_atividade',
    'nome_favorecido',
    'endereco_favorecido_rua',
    'endereco_favorecido_cidade',
    'endereco_favorecido_cep',
    'codigo_banco',
    'nome_banco',
    'agencia_numero',
    'agencia_digito',
    'conta_numero',
    'conta_digito',
    'cpf_favorecido',
    'valor',
    'base_origem'
  ];

  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  formularioPesquisa: FormGroup;
  solicitacoes: number;

  public pesquisa_efetuada: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  identificadores: string[] = ['CPF do Solicitante', 'CPF do Favorecido'];
  selecionado: string;

  constructor(
    private _ngZone: NgZone,
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
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
  user: string;

  ngOnInit(): void {
    this.formularioPesquisa = this.formBuilder.group({
      selecionado:[''],
      nr_documento:[''],
      cpf_favorecido:['']
    });
    this.solicitacoes = 0;
  }

  nr_documento: string;
  cpf_favorecido: string;
  public carregando: Boolean = false;

  pesquisarCpfSolicitante(cpf: string) {
    this.carregando = true;
    this.pesquisa_efetuada = false;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.clickedRows.clear();
    this.painelService.getReembolsoCpfSolicitante(cpf).subscribe(
      data => {
        ELEMENT_DATA = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.pesquisa_efetuada = true;
        this.carregando = false;
        this.solicitacoes = ELEMENT_DATA.length;
      }
    );
  }

  pesquisarCpfFavorecido(cpf: string) {
    this.carregando = true;
    this.pesquisa_efetuada = false;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.clickedRows.clear();
    this.painelService.getReembolsoCpfFavorecido(cpf).subscribe(
      data => {
        ELEMENT_DATA = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.pesquisa_efetuada = true;
        this.carregando = false;
        this.solicitacoes = ELEMENT_DATA.length;
      }
    );
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;

  }


  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioPesquisa.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.solicitacoes = 0;
  }

}
