import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  cd_mensagem: string;
  dc_mensagem: string;
  tipo_estrutura: number;
  cd_estrutura_comercial: string;
  nome_estrutura: number;
  nm_ciclo_operacional_inicio: string;
  nm_ciclo_operacional_termino: string;
  dt_inicio: Date;
  dt_termino: Date;
  tipo_mensagem: string;
  tipo_item_original: string;
  item_original: string;
  composicao_item_original: string;
  nome_composicao_item_original: string;
  tipo_item_original_2: string;
  item_substituto: string;
  composicao_item_substituto: string;
  nome_composicao_item_substitut: string;
  exibe_box_troca_informa: string;
  qtde_registros_por_mensagem: string;
  data_execucao_da_query: Date;

}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-plano-b-trocas',
  templateUrl: './plano-b-trocas.component.html',
  styleUrls: ['./plano-b-trocas.component.scss']
})
export class PlanoBTrocasComponent implements OnInit {

  displayedColumns: string[] = [
    'cd_mensagem',
    'dc_mensagem',
    'tipo_estrutura',
    'cd_estrutura_comercial',
    'nome_estrutura',
    'nm_ciclo_operacional_inicio',
    'nm_ciclo_operacional_termino',
    'dt_inicio',
    'dt_termino',
    'tipo_mensagem',
    'tipo_item_original',
    'item_original',
    'composicao_item_original',
    'nome_composicao_item_original',
    'tipo_item_original_2',
    'item_substituto',
    'composicao_item_substituto',
    'nome_composicao_item_substitut',
    'exibe_box_troca_informa',
    'qtde_registros_por_mensagem',
    'data_execucao_da_query'
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
  formularioPlanoBeTrocas: FormGroup;
  user: string;

  public title: string = "Planos B e Trocas";
  public item_original?: string = "";

  

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioPlanoBeTrocas = this.formBuilder.group({
      item_original:['']      
    })
  }

  pesquisar() {

    this.pesquisa_efetuada = true;
    this.painelService.getPlanosBeTrocas(this.item_original).subscribe(
      data => {
        console.table(data);
        this.dataSource = data;
      }
    )

    
  }


  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioPlanoBeTrocas.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
