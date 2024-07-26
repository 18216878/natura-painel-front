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
  formularioSimuladorEspacoDigital: FormGroup;
  user: string;
  nivelConsultora: string;
  cpf: string;

  ativarSimulacao: boolean;

  total_pedido: number;
  taxa_natura_pay: number;
  valor_menos_servicos: number;
  valor_bruto: number;
  crer_para_ver: number;
  embalagens: number;
  frete: number;
  taxa_antecipacao: number;
  lucro_cn: number;
  cupom_desconto: number;
  valor_parcelado: number;
  parcelas: number;
  juros_form: number;
  valor_atualizado_form: number;
  valor_corrigido: number = 0;

  dados_adicionados: number = 0;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    this.carregando = false;

    this.formularioSimuladorEspacoDigital = this.formBuilder.group({
      total_pedido:[''],
      taxa_natura_pay:[''],
      valor_menos_servicos:[''],
      valor_bruto:[''],
      crer_para_ver:[''],
      embalagens:[''],
      frete:[''],
      taxa_antecipacao:[''],
      lucro_cn:[''],
      cupom_desconto:[''],
      valor_parcelado:[''],
      parcelas:['']

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

  }



  limpar(){
    this.formularioSimuladorEspacoDigital.reset();
  }

  limparTabela(){
    this.dados_adicionados = 0;
  }


  limparTudo(){
    this.formularioSimuladorEspacoDigital.reset();
    this.valor_corrigido = 0;
    this.limparTabela();
    this.ativarSimulacao = false;
    this.nivelConsultora = undefined;
    this.cpf = undefined;

  }

  efetuarSimulacao() {
    this.carregando = true;
      setTimeout(() => {
        this.carregando = false;
      }, 1000)
  }

}
