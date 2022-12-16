import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  agencia_origem: number;
  conta: number;
  dac: number;
  cpf: string;
  data_pagamento: Date;
  data_devolucao: Date;
  carteira: number;
  nosso_numero: number;
  valor_liquidado: number;
  banco_pagamento: string;
  agencia_pagamento: number;
  cod_barras: string;
  motivo_devolucao: string;
  consultora: string;
  titulo: number;
  parcela: number;
  valor: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-pagamentos-rejeitados',
  templateUrl: './pagamentos-rejeitados.component.html',
  styleUrls: ['./pagamentos-rejeitados.component.scss']
})
export class PagamentosRejeitadosComponent implements OnInit {

  displayedColumns: string[] = [
    'agencia_origem',
    'conta',
    'dac',
    'data_pagamento',
    'data_devolucao',
    'carteira',
    'nosso_numero',
    'valor_liquidado',
    'banco_pagamento',
    'agencia_pagamento',
    'cod_barras',
    'motivo_devolucao',
    'consultora',
    'titulo',
    'parcela',
    'valor'
  ];
  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  
  public pesquisa_efetuada: boolean = false;

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
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioPagamentosRejeitados: FormGroup;
  user: string;

  public title: string = "Pagamentos Rejeitados";
  public codigo_cn?: string = "";

  

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioPagamentosRejeitados = this.formBuilder.group({
      codigo_cn:['']      
    })
  }

  pesquisar() {

    this.pesquisa_efetuada = true;
    this.painelService.getPagamentosRejeitados(this.codigo_cn).subscribe(
      data => {
        this.dataSource = data;
      }
    )

    
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioPagamentosRejeitados.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
