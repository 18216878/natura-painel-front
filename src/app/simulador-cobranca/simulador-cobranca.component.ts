import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  cod_cn: number;
  titulo: number;
  item: number;
  valor: string;
  data_vencimento: Date;
  atraso: number;
  multa: number;
  juros: number;
  valor_atualizado: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-simulador-cobranca',
  templateUrl: './simulador-cobranca.component.html',
  styleUrls: ['./simulador-cobranca.component.scss']
})
export class SimuladorCobrancaComponent implements OnInit {

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

  dataSource: any = ELEMENT_DATA;
  
  constructor(
    private _ngZone: NgZone, 
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService
  ) { 
    this.router = router;
    this.storage = window.localStorage;
  }

  storage: Storage;
  router: Router;
  formularioSimuladorCobranca: FormGroup;
  user: string;

  cod_cn_form: number;
  titulo_form: number;
  item_form: number;
  valor_form: string;
  data_vencimento_form: Date;
  atraso_form: number;
  multa_form: number;
  juros_form: number;
  valor_atualizado_form: number;


  public title: string = "Simulador Cobrança";

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    this.formularioSimuladorCobranca = this.formBuilder.group({
      cod_cn_form:[''],
      titulo_form:[''],
      item_form:[''],
      valor_form:[''],
      data_vencimeno_form:[''],
      atraso_form:[''],
      multa_form:[''],
      juros_form:[''],
      valor_atualizado_form:['']
   
    })

  }

}
