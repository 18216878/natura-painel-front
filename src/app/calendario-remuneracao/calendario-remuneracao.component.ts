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
  cd_setor: number;
  abertura: string;
  fechamento: string;
  fechamento_estatistico: string;
  processamento: string;
  entrega_folha: string;
  pagamento_premio: string;
  data_divulgada_lideres: string;
  ciclo: number;
  bloco: string;
  publico: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

export interface Ciclos {
  ciclo: number
}

var CICLOS: Ciclos[] = [];

@Component({
  selector: 'app-calendario-remuneracao',
  templateUrl: './calendario-remuneracao.component.html',
  styleUrls: ['./calendario-remuneracao.component.scss']
})

export class CalendarioRemuneracaoComponent implements OnInit {

  displayedColumns: string[] = [
    'cd_setor',
    'abertura',
    'fechamento',
    'fechamento_estatistico',
    'processamento',
    'entrega_folha',
    'pagamento_premio',
    'data_divulgada_lideres',
    'ciclo',
    'bloco',
    'publico'
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

  ciclosDropDown = CICLOS;

  storage: Storage;
  router: Router;
  formularioCalendarioCiclos: FormGroup;
  user: string;

  public title: string = "Calendário de Remuneração";
  public cod_setor: string;
  public ciclos: number;

  identificadores: string[] = ['Gerentes', 'Líderes'];
  selecionado: string;
  ciclo_selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      cod_setor:[''],
      ciclos:['']
    })

    this.painelService.getCalendarioRemuneracaoCiclos().subscribe(
      data => {
        this.ciclosDropDown = data;
      }
    )


    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisarRemuneracaoPublicoSetor() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetor = parseInt(this.cod_setor);

    this.painelService.getCalendarioRemuneracaoPublicoSetor(this.selecionado, codigoSetor).subscribe(
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

  getCalendarioRemuneracaoPublicoSetorCiclo() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoSetor = parseInt(this.cod_setor);
    var ciclo = parseInt(this.ciclo_selecionado);

    this.painelService.getCalendarioRemuneracaoPublicoSetorCiclo(this.selecionado, codigoSetor, ciclo).subscribe(
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

  onSelectPublico(event: Event){
    this.selecionado = event.toString();
  }

  onSelectCiclo(event: Event){
    this.ciclo_selecionado = event.toString();
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioCalendarioCiclos.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
    this.selecionado = undefined;
    this.cod_setor = undefined;
    this.ciclo_selecionado = undefined;
  }

}
