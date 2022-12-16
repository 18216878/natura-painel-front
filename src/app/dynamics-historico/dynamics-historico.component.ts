import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { DynamicsService } from '../dynamics.service';

export interface OData {
  odatacontext: string;
  value: PeriodicElement;
}

var iOData: OData[] = [];

export interface PeriodicElement {
  ticketnumber: string;
  title: string;
  _customerid_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_naturaorder_valueODataCommunityDisplayV1FormattedValue: string;
  createdonODataCommunityDisplayV1FormattedValue: string;
  caseorigincodeODataCommunityDisplayV1FormattedValue: string;
  statuscodeODataCommunityDisplayV1FormattedValue: string;
  _nat_primarycategory_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_reason_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_secondcategory_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_solution_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_solutionsecondlevel_valueODataCommunityDisplayV1FormattedValue: string;
  _ownerid_valueODataCommunityDisplayV1FormattedValue: string;
  description: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-dynamics-historico',
  templateUrl: './dynamics-historico.component.html',
  styleUrls: ['./dynamics-historico.component.scss']
})
export class DynamicsHistoricoComponent implements OnInit {

  displayedColumns: string[] = [
    'ticketnumber',
    'title',
    '_customerid_valueODataCommunityDisplayV1FormattedValue',
    '_nat_naturaorder_valueODataCommunityDisplayV1FormattedValue',
    'createdonODataCommunityDisplayV1FormattedValue',
    'caseorigincodeODataCommunityDisplayV1FormattedValue',
    'statuscodeODataCommunityDisplayV1FormattedValue',
    '_nat_primarycategory_valueODataCommunityDisplayV1FormattedValue',
    '_nat_secondcategory_valueODataCommunityDisplayV1FormattedValue',
    '_nat_reason_valueODataCommunityDisplayV1FormattedValue',
    '_nat_solution_valueODataCommunityDisplayV1FormattedValue',
    '_nat_solutionsecondlevel_valueODataCommunityDisplayV1FormattedValue',
    '_ownerid_valueODataCommunityDisplayV1FormattedValue',
    'description'
  ];
  
  dataSrc: any = iOData;
  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  
  public pesquisa_efetuada: boolean = false;
  public token: string;

  constructor(
    private _ngZone: NgZone, 
    private dynamicsService: DynamicsService,
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
  formularioDynamics: FormGroup;
  user: string;
  public carregando: Boolean = false;

  checked = false;
  public title: string = "Dynamiics Histórico";
  identificadores: string[] = ['Código', 'Pedido', 'CPF'];
  selecionado: string;  

  public codigo?: string = undefined;
  public pedido?: string = undefined;
  public cpf?: string = undefined;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioDynamics = this.formBuilder.group({
      selecionado:[''],
      codigo:[''],
      pedido:[''], 
      cpf:['']   
    })
  }


  pesquisarCodigo(codigo: string) {
    this.carregando = true;

    this.dynamicsService.tokenGenerate();

    this.pesquisa_efetuada = true;
    this.dynamicsService.getDynamicsCode(codigo).subscribe(
      data => {
        this.dataSrc = data;
        this.dataSource = this.dataSrc.value;
      }
    );

    this.carregando = false;
  }

  
  pesquisarPedido(pedido: string) {

    this.carregando = true;

    this.dynamicsService.tokenGenerate();

    this.pesquisa_efetuada = true;
    this.dynamicsService.getDynamicsOrder(pedido).subscribe(
      data => {
        this.dataSrc = data;
        this.dataSource = this.dataSrc.value;
      }
    );

    this.carregando = false;
  }

  pesquisarCpf(cpf: string) {

    this.carregando = true;

    this.dynamicsService.tokenGenerate();

    this.pesquisa_efetuada = true;
    this.dynamicsService.getDynamicsDocument(cpf).subscribe(
      data => {
        this.dataSrc = data;
        this.dataSource = this.dataSrc.value;
      }
    );

    this.carregando = false;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;    
    
  }


  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioDynamics.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
