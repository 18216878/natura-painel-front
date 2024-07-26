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
  selector: 'app-simulador-lucratividade-digital',
  templateUrl: './simulador-lucratividade-digital.component.html',
  styleUrls: ['./simulador-lucratividade-digital.component.scss']
})
export class SimuladorLucratividadeDigitalComponent implements OnInit {

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

  public title: string = "Simulador Lucratividade Espaço Digital";
  carregando: boolean;

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


      this.valorTotalPedidos = this.valorTotalPedidos + this.valor_pedido_form;

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
      this.valorTotalPedidos = 0;
      setTimeout(() => {
        this.lucroConsultora = this.valorTotalPedidos * this.percentLucro;
        this.valorMdr = this.valorTotalPedidos * this.percentMdr;
        this.lucroApagar = this.lucroConsultora - this.valorMdr;
        this.carregando = false;
      }, 1000)
  }

}
