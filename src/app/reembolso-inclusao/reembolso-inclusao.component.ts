import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FebrabanService } from '../febraban.service';
import { AccountService } from '../account.service';
import { ReembolsoPesquisaComponent } from './reembolso-pesquisa/reembolso-pesquisa.component';
import { PainelService } from '../painel.service';
import { ReembolsoFormDialogComponent } from './reembolso-form-dialog/reembolso-form-dialog.component';
import { ReembolsoStopDialogComponent } from './reembolso-stop-dialog/reembolso-stop-dialog.component';

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

    banco_pesquisa: string;

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
    this.clickedRows.clear();

    setTimeout(() => {
      this.banco_pesquisa = '';
    });
  }

  reembolsoCriarRegistro(form: FormGroup){

    // Validar Campos Obrigatórios

    var i: number = 0;

    // Validar Campo cliente
    if
    (
      form.controls['cliente'].value === "" ||
      form.controls['cliente'].value === null ||
      form.controls['cliente'].value === undefined
    ) {
        i++
      }

    // Validar Campo nr_documento
    if
    (
      form.controls['nr_documento'].value === "" ||
      form.controls['nr_documento'].value === null ||
      form.controls['nr_documento'].value === undefined
    ) {
        i++
      }

    // Validar Campo nr_ocorrencia
    if
    (
      form.controls['nr_ocorrencia'].value === "" ||
      form.controls['nr_ocorrencia'].value === null ||
      form.controls['nr_ocorrencia'].value === undefined
    ) {
        i++
      }

    // Validar Campo data_criacao
    if
    (
      form.controls['data_criacao'].value === "" ||
      form.controls['data_criacao'].value === null ||
      form.controls['data_criacao'].value === undefined
    ) {
        i++
      }

    // Validar Campo origem
    if
    (
      form.controls['origem'].value === "" ||
      form.controls['origem'].value === null ||
      form.controls['origem'].value === undefined
    ) {
        i++
      }

    // Validar Campo status_atividade

    if
    (
      form.controls['status_atividade'].value === "" ||
      form.controls['status_atividade'].value === null ||
      form.controls['status_atividade'].value === undefined
    ) {
        i++
      }

    // Validar Campo nome_favorecido

    if
    (
      form.controls['nome_favorecido'].value === "" ||
      form.controls['nome_favorecido'].value === null ||
      form.controls['nome_favorecido'].value === undefined
    ) {
        i++
      }

    // Validar Campo endereco_favorecido_rua

    if
    (
      form.controls['endereco_favorecido_rua'].value === "" ||
      form.controls['endereco_favorecido_rua'].value === null ||
      form.controls['endereco_favorecido_rua'].value === undefined
    ) {
        i++
      }

    // Validar Campo endereco_favorecido_cidade

    if
    (
      form.controls['endereco_favorecido_cidade'].value === "" ||
      form.controls['endereco_favorecido_cidade'].value === null ||
      form.controls['endereco_favorecido_cidade'].value === undefined
    ) {
        i++
      }

    // Validar Campo endereco_favorecido_cep

    if
    (
      form.controls['endereco_favorecido_cep'].value === "" ||
      form.controls['endereco_favorecido_cep'].value === null ||
      form.controls['endereco_favorecido_cep'].value === undefined
    ) {
        i++
      }

    // Validar Campo codigo_banco

    if
    (
      form.controls['codigo_banco'].value === "" ||
      form.controls['codigo_banco'].value === null ||
      form.controls['codigo_banco'].value === undefined
    ) {
        i++
      }

    // Validar Campo nome_banco

    if
    (
      form.controls['nome_banco'].value === "" ||
      form.controls['nome_banco'].value === null ||
      form.controls['nome_banco'].value === undefined
    ) {
        i++
      }

    // Validar Campo agencia_numero

    if
    (
      form.controls['agencia_numero'].value === "" ||
      form.controls['agencia_numero'].value === null ||
      form.controls['agencia_numero'].value === undefined
    ) {
        i++
      }

    // Validar Campo conta_numero

    if
    (
      form.controls['conta_numero'].value === "" ||
      form.controls['conta_numero'].value === null ||
      form.controls['conta_numero'].value === undefined
    ) {
        i++
      }

    // Validar Campo cpf_favorecido

    if
    (
      form.controls['cpf_favorecido'].value === "" ||
      form.controls['cpf_favorecido'].value === null ||
      form.controls['cpf_favorecido'].value === undefined
    ) {
        i++
      }

    // Validar Campo valor

    if
    (
      form.controls['valor'].value === "" ||
      form.controls['valor'].value === null ||
      form.controls['valor'].value === undefined
    ) {
        i++
      }


    if (i > 0) {
      this.openStopDialog();
    }
    else {
      var cliente = form.controls['cliente'].value;
      var nr_documento = form.controls['nr_documento'].value;
      var nr_ocorrencia = form.controls['nr_ocorrencia'].value;
      var data_criacao = form.controls['data_criacao'].value;
      var origem = form.controls['origem'].value;
      var data_sla = form.controls['data_sla'].value;
      var status_atividade = form.controls['status_atividade'].value;
      var nome_favorecido = form.controls['nome_favorecido'].value;
      var endereco_favorecido_rua = form.controls['endereco_favorecido_rua'].value;
      var endereco_favorecido_cidade = form.controls['endereco_favorecido_cidade'].value;
      var endereco_favorecido_cep = form.controls['endereco_favorecido_cep'].value;
      var codigo_banco = form.controls['codigo_banco'].value;
      var nome_banco = form.controls['nome_banco'].value;
      var agencia_numero = form.controls['agencia_numero'].value;
      var agencia_digito = form.controls['agencia_digito'].value;
      var conta_numero = form.controls['conta_numero'].value;
      var conta_digito = form.controls['conta_digito'].value;
      var cpf_favorecido = form.controls['cpf_favorecido'].value;
      var valor = form.controls['valor'].value;
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

      console.log(Reembolso);
      var jsonString = JSON.stringify(Reembolso);
      jsonString = jsonString.replace('[','').replace(']','');
      var json: JSON = JSON.parse(jsonString);
      this.painelService.postReembolsoCriarRegistro(json);


      this.createRecordOpenDialog();
      this.limpar();
    }

  }

  createRecordOpenDialog() {
    const dialogRef = this.dialog.open(ReembolsoFormDialogComponent, {
      width: '35em'
    });
  }

  getBankData(){
    this.codigo_banco = this.clickedRows.values().next().value.code;
    this.nome_banco = this.clickedRows.values().next().value.name;
    console.log(this.codigo_banco);
    console.log(this.nome_banco);
  }

  openStopDialog(){
    const dialogRef = this.dialog.open(ReembolsoStopDialogComponent, {
      width: '35em'
    });
  }



}
