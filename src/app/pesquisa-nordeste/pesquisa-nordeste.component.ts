import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PesquisaService } from '../pesquisa.service';

export interface PeriodicElement {
  numero_pedido: number;
  numero_nota_fiscal: string;
  codigo_cn: number;
  nome_cn: string;
  data: Date;
  aumento_pto: number;
  aumento_reais: number;
  limite_atual: number;
  qtde_vale_pontos: number;
  acao: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-pesquisa-nordeste',
  templateUrl: './pesquisa-nordeste.component.html',
  styleUrls: ['./pesquisa-nordeste.component.scss']
})
export class PesquisaNordesteComponent implements OnInit{

  displayedColumns: string[] = ['numero_pedido', 'numero_nota_fiscal', 'codigo_cn', 'nome_cn', 'data', 'aumento_pto', 'aumento_reais', 'limite_atual', 'qtde_vale_pontos', 'acao'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  public codigo_cn: string = '';

  constructor(
    private pesquisaService: PesquisaService,
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
  user: string;
  formularioPesquisaNordeste: FormGroup;
  formularioResultPesquisaNordeste: FormGroup;


  public title: string = "Nordeste";
  public numero_pedido: string;
  public cod_cn: string;
  public nome_cn: string;
  public data_pedido: string;
  public numero_nota_fiscal: string;
  public aumento_pto: string;
  public aumento_reais: string;
  public limite_atual: string;
  public qtde_vale_pontos: string;
  public acao: string;

  public pesquisa_efetuada: boolean = false;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
      this.formularioPesquisaNordeste = this.formBuilder.group({
        codigo_cn:[''],
        numero_pedido:[''],
        cod_cn:[''],
        nome_cn:[''],
        data_pedido:[''],
        numero_nota_fiscal:[''],
        aumento_pto:[''],
        aumento_reais:[''],
        limite_atual:[''],
        qtde_vale_pontos:[''],
        acao:['']
      })



  }

  carregar(){

    this.pesquisa_efetuada = true;
    var texto = this.codigo_cn;
    if (texto.length > 0) {      
      this.pesquisaService.getRecords(texto).subscribe(
        data => {
          this.dataSource = data;
        }
          )

    }      

  }

  limpar(){
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.codigo_cn = '';
    this.formularioPesquisaNordeste.reset();
    this.pesquisa_efetuada = false;
  }

}
