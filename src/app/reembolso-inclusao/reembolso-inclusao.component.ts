import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FebrabanService } from '../febraban.service';
import { AccountService } from '../account.service';
import { ReembolsoPesquisaComponent } from './reembolso-pesquisa/reembolso-pesquisa.component';
import { PainelService } from '../painel.service';

export interface iBankCodes {
  code: number;
  name: string;
}

var BankCodes: iBankCodes[] = [];

export interface iRembolso {
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
}

var Reembolso: iRembolso[] = [];


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

  dataSource: any = BankCodes;
  clickedRows = new Set<iBankCodes>();
  tableDataSource = new MatTableDataSource<iBankCodes>(BankCodes);
  formularioReembolso: FormGroup;

constructor(
    private _ngZone: NgZone,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService,
    private painelService: PainelService,
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
    codigo_banco_empty: number;
    nome_banco_empty: string;
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
        BankCodes = data;
        this.tableDataSource = new MatTableDataSource<iBankCodes>(BankCodes);
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
      codigo_banco_empty:[''],
      nome_banco_empty:[''],
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

  getDynamicsData(nr_ocorrencia: string){
    console.log(nr_ocorrencia);
  }

  getCep(cep: string){
    this.febrabanService.getCEP(cep).subscribe(
      data => {
        this.formularioReembolso.controls['endereco_favorecido_rua'].setValue(data.street);
        this.formularioReembolso.controls['endereco_favorecido_cidade'].setValue(data.city);
      }
    );
  }

  openDialog() {
      const dialogRef = this.dialog.open(ReembolsoPesquisaComponent, {
        width: '98vw',
        height: '80vh'
      });

    }
  limpar() {
    this.formularioReembolso.reset();
    this.codigo_banco = null;
    this.nome_banco = null;
    this.clickedRows.clear();
  }

  ReembolsoCriarRegistro(){
    var cliente = this.formularioReembolso.controls['cliente'].value;
    var nr_documento = this.formularioReembolso.controls['nr_documento'].value;
    var nr_ocorrencia = this.formularioReembolso.controls['nr_ocorrencia'].value;
    var data_criacao = this.formularioReembolso.controls['data_criacao'].value;
    var origem = this.formularioReembolso.controls['origem'].value;
    var data_sla = this.formularioReembolso.controls['data_sla'].value;
    var status_atividade = this.formularioReembolso.controls['status_atividade'].value;
    var nome_favorecido = this.formularioReembolso.controls['nome_favorecido'].value;
    var endereco_favorecido_rua = this.formularioReembolso.controls['endereco_favorecido_rua'].value;
    var endereco_favorecido_cidade = this.formularioReembolso.controls['endereco_favorecido_cidade'].value;
    var endereco_favorecido_cep = this.formularioReembolso.controls['endereco_favorecido_cep'].value;
    var codigo_banco = this.formularioReembolso.controls['codigo_banco'].value;
    var nome_banco = this.formularioReembolso.controls['nome_banco'].value;
    var agencia_numero = this.formularioReembolso.controls['agencia_numero'].value;
    var agencia_digito = this.formularioReembolso.controls['agencia_digito'].value;
    var conta_numero = this.formularioReembolso.controls['conta_numero'].value;
    var conta_digito = this.formularioReembolso.controls['conta_digito'].value;
    var cpf_favorecido = this.formularioReembolso.controls['cpf_favorecido'].value;
    var valor = this.formularioReembolso.controls['valor'].value;
    var base_origem = 'Tabulador Reembolso';

    Reembolso = [{
      cliente: cliente,
      nr_documento: nr_documento,
      nr_ocorrencia: nr_ocorrencia,
      data_criacao: data_criacao,
      origem: origem,
      data_sla: data_sla,
      status_atividade: status_atividade,
      nome_favorecido: nome_favorecido,
      endereco_favorecido_rua: endereco_favorecido_rua,
      endereco_favorecido_cidade: endereco_favorecido_cidade,
      endereco_favorecido_cep: endereco_favorecido_cep,
      codigo_banco: codigo_banco,
      nome_banco: nome_banco,
      agencia_numero: agencia_numero,
      agencia_digito: agencia_digito,
      conta_numero: conta_numero,
      conta_digito: conta_digito,
      cpf_favorecido: cpf_favorecido,
      valor: valor,
      base_origem: base_origem
    }];

    var jsonString = JSON.stringify(Reembolso);
    jsonString = jsonString.replace('[','').replace(']','');
    var json: JSON = JSON.parse(jsonString);
    this.painelService.postReembolsoCriarRegistro(json);




  }

}
