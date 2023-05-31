import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { DateAdapter } from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-calculadora-tempo-relacao',
  templateUrl: './calculadora-tempo-relacao.component.html',
  styleUrls: ['./calculadora-tempo-relacao.component.scss']
})
export class CalculadoraTempoRelacaoComponent implements OnInit {

  displayedColumns: string[] = [
    'tempo_relacao',
    'data_ini',
    'data_fim',
    'dias'
  ];

  dataSource = [];

  exibir_tabela: boolean = false;

  public title: string = "Calculadora Tempo de Relação";
  carregando: boolean;

  constructor(
    private _ngZone: NgZone, 
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    this.dateAdapter.setLocale('pt-br'); 
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioDatasTempoDeRelacao: FormGroup;
  formularioLateral: FormGroup;
  formularioDadosIniciais: FormGroup;
  user: string;
  nivelConsultora: string;
  cpf: string;
  diasTotais: number;
  tempoDeRelacao: string;

  ativarSimulacao: boolean;
  
  data_ini: Date;
  data_fim: Date;

  dados_adicionados: number = 0;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.carregando = false;
    this.formularioDadosIniciais = this.formBuilder.group({
      nivelConsultora:['']
    })
    
    this.formularioDatasTempoDeRelacao = this.formBuilder.group({
      data_ini:[''],
      data_fim:[''],
      dias:[''],
      tempo_relacao:['']
      
    })
    
    this.formularioLateral = this.formBuilder.group({
      valor_original:[''],
      debito_atualizado:[''],
      multa_fixa_form:[''],
      multa_aplicada_form:[''],
      total_multa:[''],
      juros_mes:[''],
      juros_mes_aplicado:[''],
      juros_dia_aplicado:[''],
      total_juros_atraso:[''],
      total_juros_parcelas:['']
      
    })
    
    this.diasTotais = 0;
    this.ativarSimulacao = false;
    this.tempoDeRelacao = '';
  }

  inserir(form: FormGroup){

    var i: number = 0;

    if (
      form.controls['data_ini'].value === "" ||
      form.controls['data_ini'].value === null ||
      form.controls['data_ini'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['data_fim'].value === "" ||
      form.controls['data_fim'].value === null ||
      form.controls['data_fim'].value === undefined
    )
    {
      i++
    }

    if (i > 0){
      var message = 'Campos invalidos ou não preenchidos';
      var action = 'Fechar';
      this._snackBar.open(message, action);
    }
    else {
      var dataIni = moment(this.data_ini);
      var dataFim = moment(this.data_fim);
      var dias = dataFim.diff(dataIni, 'days');

      var duracaoTabela = moment.duration(dias, 'days');
      var partAnos = duracaoTabela.years();
      var partMeses = duracaoTabela.months();
      var partDias = duracaoTabela.days();

      var tempo = `${partAnos} ano${partAnos > 1 ? 's' : ''}, ${partMeses} ${partMeses > 1 ? 'meses' : 'mês'}, ${partDias} dia${partDias > 1 ? 's' : ''}`
      var newRow = {
        tempo_relacao: tempo,
        data_ini: dataIni,
        data_fim: dataFim,
        dias: dias
      }

      this.dataSource = [...this.dataSource, newRow];
  
      this.exibir_tabela = true;

      this.diasTotais = this.diasTotais + newRow.dias;

      var duracao = moment.duration(this.diasTotais, 'days');
      var dMeses = duracao.months();
      var dAnos = duracao.years();
      var dDias = duracao.days(); 
      
      var dTempo = `${dAnos} ano${dAnos > 1 ? 's' : ''}, ${dMeses} ${dMeses > 1 ? 'meses' : 'mês'}, ${dDias} dia${dDias > 1 ? 's' : ''}`
      
      
      this.tempoDeRelacao = dTempo;

      this.formularioDatasTempoDeRelacao.reset();
    }   

  }

  limpar(){
    this.formularioDatasTempoDeRelacao.reset();
  }

  limparTabela(){
    this.dataSource = [];
    this.exibir_tabela = false;
    this.dados_adicionados = 0; 
    this.tempoDeRelacao = '';
    this.diasTotais = 0;
  }


  limparTudo(){
    this.formularioDatasTempoDeRelacao.reset();
    this.formularioLateral.reset();
    this.formularioDadosIniciais.reset();
    this.limparTabela();
    this.ativarSimulacao = false;
    this.tempoDeRelacao = '';

  }

}
