import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { DateAdapter } from '@angular/material/core';
import { SimuladorEmptyDialogComponent } from './simulador-empty-dialog/simulador-empty-dialog.component';
import { AlcadaAcordoDiferenciadoComponent } from './alcada-acordo-diferenciado/alcada-acordo-diferenciado.component';
import jsPDF from 'jspdf';
import { CondicaoNegociacaoComponent } from './condicao-negociacao/condicao-negociacao.component';
import { QuatroParcelasComponent } from './quatro-parcelas/quatro-parcelas.component';
import { CincoParcelasComponent } from './cinco-parcelas/cinco-parcelas.component';
import { SelecionarParcelasComponent } from './selecionar-parcelas/selecionar-parcelas.component';

@Component({
  selector: 'app-simulador-cobranca',
  templateUrl: './simulador-cobranca.component.html',
  styleUrls: ['./simulador-cobranca.component.scss']
})
export class SimuladorCobrancaComponent implements OnInit {

  myFilter = (d: Date | null): boolean => {
    const moment = require('moment');
    const data = new Date();
    const day = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    const semana = (d || new Date()).getDay();
    const sevenDays = moment(data).add('days', 7);
    return d > day && d <= sevenDays && semana !== 0 && semana !== 6;
  };

  myFilterP = (d: Date | null): boolean => {
    const moment = require('moment');
    const data = new Date();
    const day = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    const semana = (d || new Date()).getDay();
    return d < day && semana !== 0 && semana !== 6;
  };

  displayedColumns: string[] = [
    'titulo',
    'item',
    'valor',
    'data_vencimento',
    'atraso',
    'multa',
    'juros',
    'valor_atualizado'
  ];

  dataSource = [];

  exibir_tabela: boolean = false;
  
  constructor(
    private _ngZone: NgZone, 
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService,
    private dateAdapter: DateAdapter<Date>
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    this.dateAdapter.setLocale('pt-br'); 
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioSimuladorCobranca: FormGroup;
  formularioLateral: FormGroup;
  formularioDadosIniciais: FormGroup;
  user: string;

  cod_cn_form: number;
  titulo_form: number;
  item_form: number;
  valor_form: number;
  data_vencimento_form: Date;
  atraso_form: number;
  multa_form: number;
  juros_form: number;
  valor_atualizado_form: number;

  dados_adicionados: number = 0;

  data_pagamento: Date;
  valor_original: number = 0;
  condicao_pagamento: string;
  parcelas: number;
  debito_atualizado: number = 0;
  multa_fixa_form: number;
  multa_aplicada_form: number;
  total_multa: number = 0;
  juros_mes: number;
  juros_mes_aplicado: number;
  juros_dia_aplicado: number;
  total_juros_atraso: number;
  total_juros_parcelas: number;

  multa_fixa: number = 0.0233;
  
  public title: string = "Simulador Cobrança";

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    
    this.formularioDadosIniciais = this.formBuilder.group({
      cod_cn_form:[''],
      data_pagamento:[''],
      condicao_pagamento:[''],
      parcelas:['']
    });

    this.formularioSimuladorCobranca = this.formBuilder.group({
      titulo_form:[''],
      item_form:[''],
      valor_form:[''],
      data_vencimento_form:[''],
      atraso_form:[''],
      multa_form:[''],
      juros_form:[''],
      valor_atualizado_form:['']
   
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

  }

  inserir(form: FormGroup){

    var i: number = 0;

    if (
      form.controls['titulo_form'].value === "" ||
      form.controls['titulo_form'].value === null ||
      form.controls['titulo_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['item_form'].value === "" ||
      form.controls['item_form'].value === null ||
      form.controls['item_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['valor_form'].value === "" ||
      form.controls['valor_form'].value === null ||
      form.controls['valor_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['data_vencimento_form'].value === "" ||
      form.controls['data_vencimento_form'].value === null ||
      form.controls['data_vencimento_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['atraso_form'].value === "" ||
      form.controls['atraso_form'].value === null ||
      form.controls['atraso_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['multa_form'].value === "" ||
      form.controls['multa_form'].value === null ||
      form.controls['multa_form'].value === undefined
    )
    {
      i++
    }

    if (
      this.data_pagamento === null ||
      this.data_pagamento === undefined      
      )

      {
        i++
      }

      if (
        this.cod_cn_form === null ||
        this.cod_cn_form === undefined      
        )
  
        {
          i++
        }

        if (
          this.condicao_pagamento === null ||
          this.condicao_pagamento === undefined      
          )
    
          {
            i++
          }

    if (i > 0){
      this.openDialog();
    }
    else {
      this.multa_fixa = 0.0233
      var newRow = {
        titulo: this.titulo_form,
        item: this.item_form,
        valor: this.valor_form,
        data_vencimento: this.data_vencimento_form,
        atraso: this.atraso_form,
        multa: this.multa_form,
        juros: 0,
        valor_atualizado: 0
      }
  
      this.dataSource = [...this.dataSource, newRow];

      this.valor_original = this.valor_original + this.valor_form;
      this.total_multa = this.total_multa + this.multa_form;
  
      this.exibir_tabela = true;
      
  
      this.dados_adicionados++; 
      this.formularioSimuladorCobranca.reset();
    }   

  }

  limpar(){
    this.formularioSimuladorCobranca.reset();
  }

  limparTabela(){
    this.dataSource = [];
    this.exibir_tabela = false;
    this.dados_adicionados = 0; 
  }

  calcularAtraso(){

    if (this.data_pagamento !== undefined && this.data_vencimento_form !== undefined){

      const moment = require('moment');
      const now = moment(this.data_pagamento);
      
      const past = this.data_vencimento_form;
      const duration = moment.duration(now.subtract(1, 'days').diff(past));
      const days = duration.asDays();

      this.atraso_form = days;

      this.multa_form = this.valor_form * this.multa_fixa;

      this.juros_form = 0;

      this.valor_atualizado_form = 0;

      this.multa_fixa_form = this.multa_fixa;
      this.multa_aplicada_form = this.multa_fixa_form;



    }    

  }

  openDialog() {
    const dialogRef = this.dialog.open(SimuladorEmptyDialogComponent, {
      width: '35em'
    });

  }

  exibeAlcada(){
    const dialogRef = this.dialog.open(AlcadaAcordoDiferenciadoComponent, {
      width: '50em',
      height: '20em'
    });

  }

  limparTudo(){
    this.formularioSimuladorCobranca.reset();
    this.formularioLateral.reset();
    this.formularioDadosIniciais.reset();
    this.limparTabela();
  }

  geraExtrato(){

  }

  
  simularAcordo(){
    if (this.dataSource.length === 0){
      const dialogRef = this.dialog.open(CondicaoNegociacaoComponent, {
        width: '35em'
      });
    }
    else if (this.condicao_pagamento === 'Parcelado' && this.valor_original < 240){
      const dialogRef = this.dialog.open(QuatroParcelasComponent, {
        width: '35em'
      });
    }
    else if (this.condicao_pagamento === 'Parcelado' && this.valor_original < 500 && this.parcelas === 5){
      const dialogRef = this.dialog.open(CincoParcelasComponent, {
        width: '35em'
      });
    }
    else if (this.condicao_pagamento === 'Parcelado' && this.parcelas === undefined){
      const dialogRef = this.dialog.open(SelecionarParcelasComponent, {
        width: '35em'
      });
    }
    else {
      var atrasos: number[] = [];

      this.dataSource.forEach(item => {
        atrasos.push(item.atraso)
      });

      var min = Math.min(...atrasos);
      var max = Math.max(...atrasos);
      
      var grupo: string = undefined;

      if (min >= 1 && max <= 90){
        grupo = "Grupo A"
      }
      else if (min >= 91 && max <= 120){
        grupo = "Grupo B"
      }
      else if (min >= 121 && max <= 180){
        grupo = "Grupo C"
      }

      if (grupo === "Grupo A"){
        if(this.condicao_pagamento==='Parcelado'){
          this.juros_mes_aplicado = 0.0026;
        }
        else{
          this.juros_mes_aplicado = 0.0017;
        }
      }
      else if (grupo === "Grupo B"){
        if(this.condicao_pagamento==='Parcelado'){
          this.juros_mes_aplicado = 0.002;
        }
        else{
          this.juros_mes_aplicado = 0.0007;
        }
      }
      else if (grupo === "Grupo C"){
        if(this.condicao_pagamento==='Parcelado'){
          this.juros_mes_aplicado = 0.0013;
        }
        else{
          this.juros_mes_aplicado = 0;
        }
      }
      
      this.juros_dia_aplicado = this.juros_mes_aplicado / 30

      this.dataSource.map(
        item => {
          item.juros = item.valor * this.juros_mes_aplicado * item.atraso;
          item.valor_atualizado = item.valor + item.multa + item.juros;
          this.debito_atualizado = this.debito_atualizado + item.valor_atualizado;
        }
      )
      

      

    }

  }

  gerarExtrato() {
    const moment = require('moment');
    var arquivo = this.cod_cn_form.toString() + "_" + this.condicao_pagamento + "_" + moment(new Date()).format('YYYYMMDD_HHmmss') + ".pdf"
    var mensagem = "Extrato gerado em " + moment(new Date()).format('DD/MM/YYYY') + " às " + moment(new Date()).format('HH:mm:ss');

    var doc = new jsPDF();

    doc.addImage("../../../assets/img/revendedora-natura-cadastro.png", "PNG", 50, 2, 90, 20);
    doc.setFontSize(12);

    doc.setLineWidth(0.5);
    doc.line(20, 28, 185, 28);

    doc.setLineWidth(0.5);
    doc.line(20, 28, 20, 96);

    doc.setLineWidth(0.5);
    doc.line(20, 96, 185, 96);

    doc.setLineWidth(0.5);
    doc.line(185, 28, 185, 96);


    doc.setTextColor(255,87,34);
    doc.text("Código CN", 25, 40);
    doc.setTextColor(100);
    doc.text(this.cod_cn_form.toString(), 158, 40);

    doc.setTextColor(255,87,34);
    doc.text("Condição de Pagamento", 25, 50);
    doc.setTextColor(100);
    doc.text(this.condicao_pagamento, 158, 50);
    
    doc.setTextColor(255,87,34);
    doc.text("Parcelas", 25, 60);
    doc.setTextColor(100);
    doc.text(this.parcelas.toString(), 158, 60);
    
    doc.setTextColor(255,87,34);
    doc.text("Valor Parcela", 25, 70);
    doc.setTextColor(100);
    doc.text("R$ 556,26", 158, 70);
    
    doc.setTextColor(255,87,34);
    doc.text("Data de Pagamento", 25, 80);
    doc.setTextColor(100);
    
    doc.text(moment(this.data_pagamento).format('DD/MM/YYYY'), 158, 80);
    
    doc.setTextColor(255,87,34);
    doc.text("Alçada de Negociação", 25, 90);
    doc.setTextColor(100);
    const number = 0.7555;

    var juros_percent = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumSignificantDigits: 2,  maximumSignificantDigits: 2}).format(this.juros_mes_aplicado);
    doc.text(juros_percent.toString(), 158, 90);

    var data = [];

    this.dataSource.map(
      obj => {
        var vlr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(obj.valor);
        var dt = new Intl.DateTimeFormat('pt-BR').format(obj.data_vencimento);
        var d =
          {
            titulo: obj.titulo,
            item: obj.item.toString(),
            valor: vlr.toString(),
            data_vencimento: dt,
            atraso: obj.atraso.toString()
          }

          data.push(d);
        
      }
    )

  var headers = [
    "titulo",
    "item",
    "valor",
    "data_vencimento",
    "atraso"
  ];
  

  doc.table(40, 110, data, headers, { autoSize: true });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.text(mensagem, 20, 280);

  doc.save(arquivo)

  }

}