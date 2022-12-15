import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { DateAdapter } from '@angular/material/core';
import { SimuladorEmptyDialogComponent } from './simulador-empty-dialog/simulador-empty-dialog.component';
import { AlcadaAcordoDiferenciadoComponent } from './alcada-acordo-diferenciado/alcada-acordo-diferenciado.component';

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
    return d >= day && d <= sevenDays && semana !== 0 && semana !== 6;
  };

  displayedColumns: string[] = [
    'cod_cn',
    'titulo',
    'item',
    'valor',
    'data_vencimento',
    'atraso',
    'multa',
    'juros',
    'valor_atualizado'

  ];

  dataSource: any = [];

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
  debito_atualizado: number;
  multa_fixa_form: number;
  multa_aplicada_form: number;
  total_multa: number;
  juros_mes: number;
  juros_mes_aplicado: number;
  juros_dia_aplicado: number;
  total_juros_atraso: number;
  total_juros_parcelas: number;

  multa_fixa: number = 0.0233;
  
  public title: string = "Simulador Cobrança";

  ngOnInit(): void {

    
    this.user = this.accountService.get('user')?.toString();
    this.formularioSimuladorCobranca = this.formBuilder.group({
      cod_cn_form:[''],
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
      data_pagamento:[''],
      valor_original:[''],
      condicao_pagamento:[''],
      parcelas:[''],
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
      form.controls['cod_cn_form'].value === "" ||
      form.controls['cod_cn_form'].value === null ||
      form.controls['cod_cn_form'].value === undefined
    )
    {
      i++
    }

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
      form.controls['juros_form'].value === "" ||
      form.controls['juros_form'].value === null ||
      form.controls['juros_form'].value === undefined
    )
    {
      i++
    }

    if (
      form.controls['valor_atualizado_form'].value === "" ||
      form.controls['valor_atualizado_form'].value === null ||
      form.controls['valor_atualizado_form'].value === undefined
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

    if (i > 0){
      this.openDialog();
    }
    else {
      var newRow = {
        cod_cn: this.cod_cn_form,
        titulo: this.titulo_form,
        item: this.item_form,
        valor: this.valor_form,
        data_vencimento: this.data_vencimento_form,
        atraso: this.atraso_form,
        multa: this.multa_form,
        juros: this.juros_form,
        valor_atualizado: this.valor_atualizado_form
      }
  
      this.dataSource = [...this.dataSource, newRow];

      this.valor_original = this.valor_original + this.valor_form;
  
      console.log(this.valor_form);
      console.log(this.valor_original);
      this.exibir_tabela = true;
  
      this.dados_adicionados++; 
      this.formularioSimuladorCobranca.reset();
    }   

  }

  limpar(){
    this.formularioSimuladorCobranca.reset();
  }

  limparTabela(){
    this.dataSource = null;
    this.exibir_tabela = false;
  }

  calcularAtraso(){

    if (
      this.data_pagamento === null ||
      this.data_pagamento === undefined  
    )
    {

    }
    else{

      const moment = require('moment');
      const now = moment(this.data_pagamento);
      
      const past = this.data_vencimento_form;
      const duration = moment.duration(now.diff(past));
      const days = duration.asDays();
  
      this.atraso_form = days;
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

}


