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
import { ExcelService } from '../../excel.service';
import { DateAdapter } from '@angular/material/core';

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
  data_registro: string;
  matricula: number;
  nome: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-reembolso-exporta-dados',
  templateUrl: './reembolso-exporta-dados.component.html',
  styleUrls: ['./reembolso-exporta-dados.component.scss']
})
export class ReembolsoExportaDadosComponent implements OnInit {

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
      'base_origem',
      'data_registro',
      'matricula',
      'nome'
    ];

    dataSource: any = ELEMENT_DATA;
    clickedRows = new Set<PeriodicElement>();
    tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    formularioPesquisa: FormGroup;

    public pesquisa_efetuada: boolean = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

  public data_inicial;
  public data_final;

  public carregando: boolean;
  public carregandoExcel: boolean;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private excelService: ExcelService,
    private painelService: PainelService

  ) {
    this.dateAdapter.setLocale('pt-br');
    this.carregando = false;
  }

  ngOnInit(): void {
    this.formularioPesquisa = this.formBuilder.group({
      data_inicial:[''],
      data_final:['']
    });

    this.carregando = false;
    this.carregandoExcel = false;

  }

  consultaDados(){

    this.carregando = true;
    if (
      (this.data_inicial === undefined && this.data_final === undefined) ||
      (this.data_inicial === null && this.data_final === null) ||
      (this.data_inicial === undefined && this.data_final === null) ||
      (this.data_inicial === null && this.data_final === undefined)
      ){
        var message = 'É necessário preencher data inicial e data final';
        var action = '❌'
        this._snackBar.open(message, action);
        this.carregando = false;
      }
    else if (this.data_inicial === undefined || this.data_inicial === null){
      var message = 'É necessário preencher a data inicial';
      var action = '❌'
      this._snackBar.open(message, action);
      this.carregando = false;
    }
    else if (this.data_final === undefined || this.data_final === null){
      var message = 'É necessário preencher a data final';
      var action = '❌'
      this._snackBar.open(message, action);
      this.carregando = false;
    }
    else {
      const moment = require('moment');

    var now = moment(this.data_final);
    var past = moment(this.data_inicial);

    if(now < past){
      var message = 'Data final não pode ser maior que data inicial';
      var action = '❌'
      this._snackBar.open(message, action);
      this.carregando = false;
    }
    else {
      var duration = moment.duration(now.diff(past));
      var days = duration.asDays();

      if (days > 90) {
        var message = 'Período de extração maior que 90 dias';
        var action = '❌'
        this._snackBar.open(message, action);
        this.carregando = false;
      }
      else {
        var dataInicial = moment(this.data_inicial).format('YYYY-MM-DD');
        var dataFinal = moment(this.data_final).format('YYYY-MM-DD');


        this.painelService.getReembolsoExportaDados(dataInicial, dataFinal).subscribe(
          (data) => {
            this.dataSource = data;
            this.tableDataSource = new MatTableDataSource<PeriodicElement>(this.dataSource);
            this.tableDataSource.paginator = this.paginator;
            this.pesquisa_efetuada = true;
            this.carregando = false;
          },
          (error) => {
            var message = 'Erro durante a consulta: ' + error;
            var action = '❌'
            this._snackBar.open(message, action);
            this.carregando = false;
          }
        );
      }
    }

    }


  }

  exportaDados(){

    this.carregandoExcel = true;

    if(this.dataSource.length === 0){
      var message = 'Sem dados a serem exportados';
      var action = '❌'
      this._snackBar.open(message, action);
      this.carregandoExcel = false;
    }
    else {

      this.excelService.generateExcelReembolso(this.dataSource);
      this.carregandoExcel = false;

    }

  }

  limparCampos(){
    this.formularioPesquisa.reset();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.pesquisa_efetuada = false;
  }

}
