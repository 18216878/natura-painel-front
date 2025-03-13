import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FebrabanService } from '../febraban.service';
import { AccountService } from '../account.service';

export interface PeriodicElement {
  code: number;
  name: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-reembolso-inclusao',
  templateUrl: './reembolso-inclusao.component.html',
  styleUrls: ['./reembolso-inclusao.component.scss']
})
export class ReembolsoInclusaoComponent implements OnInit {

  displayedColumns: string[] = [
    'code',
    'name'
  ];

  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  formularioReembolso: FormGroup;

constructor(
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService,
    private febrabanService: FebrabanService
  ) {
    this.router = router;
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }

  storage: Storage;
    router: Router;
    user: string;


    // Campos da tela
    cliente: string;
    nr_documento: string;
    nr_ocorrencia: string;
    data_criacao: string;
    origem: string;
    data_sla: string;
    status_atividade: string;
    nome_favorecido: string;
    endereco_favorecido_rua: string;
    endereco_favorecido_cidade: string;
    endereco_favorecido_cep: string;
    codigo_banco: number;
    nome_banco: string;
    agencia_numero: string;
    agencia_digito: string;
    conta_numero: string;
    conta_digito: string;
    cpf_favorecido: string;
    valor: number;
    base_origem: string;

  public title: string = 'Reembolso';


  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.febrabanService.getBanks().subscribe(
      data => {
        ELEMENT_DATA = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
      }
    );

    this.formularioReembolso = this.formBuilder.group({
      cliente:[''],
      nr_documento:[''],
      nr_ocorrencia:[''],
      data_criacao:[''],
      origem:[''],
      data_sla:[''],
      status_atividade:[''],
      nome_favorecido:[''],
      endereco_favorecido_rua:[''],
      endereco_favorecido_cidade:[''],
      endereco_favorecido_cep:[''],
      codigo_banco:[''],
      nome_banco:[''],
      agencia_numero:[''],
      agencia_digito:[''],
      conta_numero:[''],
      conta_digito:[''],
      cpf_favorecido:[''],
      valor:[''],
      base_origem:['']
    });


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

}
