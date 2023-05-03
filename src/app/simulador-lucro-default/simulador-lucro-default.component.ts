import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { DateAdapter } from '@angular/material/core';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-simulador-lucro-default',
  templateUrl: './simulador-lucro-default.component.html',
  styleUrls: ['./simulador-lucro-default.component.scss']
})
export class SimuladorLucroDefaultComponent implements OnInit {

  displayedColumns: string[] = [
    'pedido',
    'valor_total_pedido',
    'data_pedido',
    'lucro'
  ];

  dataSource = [];

  exibir_tabela: boolean = false;

  public title: string = "Simulador Lucro Default";
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
  formularioSimuladorCobranca: FormGroup;
  formularioLateral: FormGroup;
  formularioDadosIniciais: FormGroup;
  user: string;
  nivelConsultora: string;
  cpf: string;

  ativarSimulacao: boolean;

  cod_cn_form: number;
  titulo_form: number;
  pedido_form: number;
  lucroApagar: number;
  valorMdr: number;
  percentMdr: number = 0.0399;
  percentLucro: number;
  lucroConsultora: number;
  valor_pedido_form: number;
  valor_lucro_form: number;
  valorTotalPedidos: number;
  data_pedido_form: Date;
  atraso_form: number;
  multa_form: number;
  juros_form: number;
  valor_atualizado_form: number;
  valor_corrigido: number = 0;

  dados_adicionados: number = 0;
  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    this.carregando = false;
    this.formularioDadosIniciais = this.formBuilder.group({
      nivelConsultora:['']
    })
    
    this.formularioSimuladorCobranca = this.formBuilder.group({
      pedido_form:[''],
      valor_pedido_form:[''],
      data_pedido_form:[''],
      valor_lucro_form:['']
      
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
    
    this.ativarSimulacao = false;
     

  }

  simular(){
    if(
      (this.nivelConsultora === undefined || this.nivelConsultora === null || this.nivelConsultora === '')
      &&
      (this.cpf === undefined || this.cpf === null || this.cpf === '')
      ){
      var message = 'É necessário selecionar o nível da consultora antes de efetuar a simulação';
      var action = 'Fechar';
      this._snackBar.open(message, action);
    }
    else {
      this.ativarSimulacao = true;
    }
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    switch(valor){
      case 'Diamante':
        this.percentLucro = 0.35;
        break;
      case 'Ouro':
        this.percentLucro = 0.32;
        break;
      case 'Prata':
        this.percentLucro = 0.3;
        break;
      case 'Bronze':
        this.percentLucro = 0.3;
        break;
      case 'Semente':
        this.percentLucro = 0.2;
        break;
      default:
        this.percentLucro = 0;
    } 
    
  }

  inserir(form: FormGroup){

    var i: number = 0;

    if (
      form.controls['pedido_form'].value === "" ||
      form.controls['pedido_form'].value === null ||
      form.controls['pedido_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['valor_pedido_form'].value === "" ||
      form.controls['valor_pedido_form'].value === null ||
      form.controls['valor_pedido_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['data_pedido_form'].value === "" ||
      form.controls['data_pedido_form'].value === null ||
      form.controls['data_pedido_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['valor_lucro_form'].value === "" ||
      form.controls['valor_lucro_form'].value === null ||
      form.controls['valor_lucro_form'].value === undefined
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
      var newRow = {
        pedido: this.pedido_form,
        valor_total_pedido: this.valor_pedido_form,
        data_pedido: this.data_pedido_form,
        lucro: this.valor_lucro_form
      }
  
      this.dataSource = [...this.dataSource, newRow];

      this.valorTotalPedidos = this.valorTotalPedidos + this.valor_pedido_form;
  
      this.exibir_tabela = true;
      
  
      this.dados_adicionados++; 
      this.formularioSimuladorCobranca.reset();
    }   

  }

  validarRegra(){
    var dataPedido = moment(this.data_pedido_form);
    var dataLimite = moment(dataPedido).add(30, 'days');
    var dataAtual = moment(new Date());

    if(dataLimite >= dataAtual){
      this.valor_lucro_form = (this.valor_pedido_form * this.percentLucro) - (this.valor_pedido_form * this.percentMdr);
    }
    else{
      this.data_pedido_form = undefined;
      var message = 'Data do pedido superior a 30 dias';
      var action = 'Fechar';
      this._snackBar.open(message, action);
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


  limparTudo(){
    this.formularioSimuladorCobranca.reset();
    this.formularioLateral.reset();
    this.formularioDadosIniciais.reset();
    this.valor_corrigido = 0;
    this.limparTabela();
    this.ativarSimulacao = false;
    this.nivelConsultora = undefined;
    this.percentLucro = undefined;
    this.lucroConsultora = undefined;
    this.valorTotalPedidos = undefined;
    this.valorMdr = undefined;
    this.lucroApagar = undefined;
    this.cpf = undefined;

  }

  efetuarSimulacao() {
    this.carregando = true;
    if (this.dataSource.length === 0){
      var message = 'Sem dados suficientes para a simulação';
      var action = 'Fechar';
      this._snackBar.open(message, action);
      this.carregando = false;
    }
    else {
      this.valorTotalPedidos = 0;
      this.dataSource.map(
        item => {
          this.valorTotalPedidos = this.valorTotalPedidos + item.valor_total_pedido;
        }
      )
      setTimeout(() => {
        this.lucroConsultora = this.valorTotalPedidos * this.percentLucro;
        this.valorMdr = this.valorTotalPedidos * this.percentMdr;
        this.lucroApagar = this.lucroConsultora - this.valorMdr;
        this.carregando = false;
      }, 1000)
    }
  }

  gerarPdf() {

    if (isNaN(this.valorTotalPedidos) || this.valorTotalPedidos === undefined || this.valorTotalPedidos === 0){
      var message = 'Sem dados para gerar o pdf. Favor efetuar a simulação.';
      var action = 'Fechar';
      this._snackBar.open(message, action);
    }
    else {
      const moment = require('moment');
      var arquivo = "Lucro_Default_" + this.cpf + '_' + moment(new Date()).format('YYYYMMDD') + ".pdf"
      var mensagem = "Extrato gerado em " + moment(new Date()).format('DD/MM/YYYY') + " às " + moment(new Date()).format('HH:mm:ss');
  
      var doc = new jsPDF();
  
      var myImage = new Image();
      var cpfResumo = this.cpf.substring(0,3) + '.' + this.cpf.substring(3,6) + '.' + this.cpf.substring(6,9) + '-' + this.cpf.substring(9);
      var nivelConsultoraResumo = this.nivelConsultora;
      var percentLucroResumo = this.percentLucro;
      var percentMdrResumo = this.percentMdr;
      var valorTotalPedidosResumo = this.valorTotalPedidos;
      var lucroConsultoraResumo = this.lucroConsultora;
      var valorMdrResumo = this.valorMdr;
      var lucroApagarResumo = this.lucroApagar;
      var dataSourceMap = this.dataSource;
  
  
      myImage.src = 'https://tabulador.csu.com.br/natura/painel/front/assets/img/revendedora-natura-cadastro.png';
      // myImage.src = './assets/img/revendedora-natura-cadastro.png';
  
      myImage.onload = function(){
  
        doc.addImage(myImage, "PNG", 50, 2, 90, 20);
        doc.setFontSize(12);
  
        doc.setLineWidth(0.5);
        doc.line(20, 28, 185, 28);
    
        doc.setLineWidth(0.5);
        doc.line(20, 28, 20, 116);
    
        doc.setLineWidth(0.5);
        doc.line(20, 116, 185, 116);
  
        doc.setLineWidth(0.5);
        doc.line(185, 28, 185, 116);
    
        doc.setTextColor(255,87,34);
        doc.text("CPF da Consultora", 25, 40);
        doc.setTextColor(100);
        doc.text(cpfResumo, 152, 40);
    
        doc.setTextColor(255,87,34);
        doc.text("Nível da Consultora", 25, 50);
        doc.setTextColor(100);
        doc.text(nivelConsultoraResumo, 152, 50);
    
        var lucroNivelPercent = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumSignificantDigits: 2,  maximumSignificantDigits: 2}).format(percentLucroResumo);
        doc.setTextColor(255,87,34);
        doc.text("Condição de Pagamento", 25, 60);
        doc.setTextColor(100);
        doc.text(lucroNivelPercent, 152, 60);
        
        var MDRtxPercent = new Intl.NumberFormat('pt-BR', { style: 'percent', minimumSignificantDigits: 2,  maximumSignificantDigits: 3}).format(percentMdrResumo);
        doc.setTextColor(255,87,34);
        doc.text("MDR", 25, 70);
        doc.setTextColor(100);
        doc.text(MDRtxPercent, 152, 70);
  
        doc.setTextColor(255,87,34);
        doc.text("Valor Total dos Pedidos", 25, 80);
        doc.setTextColor(100);
        var vlr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorTotalPedidosResumo);
        doc.text(vlr, 152, 80);
        
        doc.setTextColor(255,87,34);
        doc.text("Lucro Consultora", 25, 90);
        doc.setTextColor(100);
        var vlrLucro = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroConsultoraResumo);
        doc.text(vlrLucro, 152, 90);
        
        doc.setTextColor(255,87,34);
        doc.text("(-) MDR (3,99%)", 25, 100);
        doc.setTextColor(100);
        var vlrMdr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valorMdrResumo);
        doc.text(vlrMdr, 152, 100);
  
        doc.setTextColor(255,87,34);
        doc.text("(=)Lucro a pagar", 25, 110);
        doc.setTextColor(100);
        var vlrMdr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroApagarResumo);
        doc.text(vlrMdr, 152, 110);
  
        var data = [];
  
  
  
        dataSourceMap.map(
          obj => {
            var valorTotalPedidoTabela = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(obj.valor_total_pedido);
            var valorTotalLucroTabela = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(obj.lucro);
            var dt = new Intl.DateTimeFormat('pt-BR').format(obj.data_pedido);
            var d =
              {
                pedido: obj.pedido.toString(),
                valor_total_pedido: valorTotalPedidoTabela.toString(),
                data_pedido: dt.toString(),
                lucro: valorTotalLucroTabela.toString()
              }
    
              data.push(d);
            
          }
        )
  
        var headers = [
          'pedido',
          'valor_total_pedido',
          'data_pedido',
          'lucro'
        ];
        
  
        doc.table(40, 130, data, headers, { autoSize: true });
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(mensagem, 20, 280);
        doc.save(arquivo);
  
      };
    }


    
  }

  validarCpf() {
    var digitos = this.cpf.length;
    if(digitos < 11) {
      var message = 'É obrigatório que o CPF tenha 11 dígitos';
      var action = 'Fechar';
      this._snackBar.open(message, action);
      this.cpf = undefined;
    } 
  }

}
