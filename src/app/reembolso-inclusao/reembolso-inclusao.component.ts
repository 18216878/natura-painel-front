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
import { DynamicsService } from '../dynamics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import * as momentTimeZone from 'moment-timezone';
import * as moment from 'moment';
import { ReembolsoExportaDadosComponent } from './reembolso-exporta-dados/reembolso-exporta-dados.component';
import { ReembolsoAutenticacaoComponent } from './reembolso-autenticacao/reembolso-autenticacao.component';

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
  data_registro: string;
  usuario: string;
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
    private _snackBar: MatSnackBar,
    router: Router,
    private accountService: AccountService,
    private dynamicsService: DynamicsService,
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

    autenticado: string;

    public carregando: Boolean = false;

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

    public returnDynamicsArray = [];

  public title: string = 'Reembolso';

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();

    // Validação do token antes de registrarWaveTracking
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const decodeJwt = (token: string): any => {
      try {
        const payload = token.split('.')[1];
        let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return JSON.parse(atob(base64));
      } catch {
        return null;
      }
    };
    const isTokenValid = (token: string): boolean => {
      if (!token) return false;
      const decoded = decodeJwt(token);
      if (!decoded || !decoded.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    };
    const registrarTracking = (token: string) => {
      this.painelService.registrarWaveTracking({
        pagina: this.title,
        url: this.router.url,
        usuario: this.user,
        acao: 'Acessou a página'
      });
    };
    if (isTokenValid(accessToken)) {
      registrarTracking(accessToken);
    } else if (isTokenValid(refreshToken)) {
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            registrarTracking(res.accessToken);
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

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
      base_origem:[''],
      banco_pesquisa:['']
    });

    this.autenticarOpenDialog();


  }

  applyFilter(event: Event | string) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.tableDataSource.filter = filterValue.trim().toLowerCase();

    let filterValue: string;

  if (typeof event === 'string') {
    filterValue = event;
  } else {
    const inputElement = event.target as HTMLInputElement;
    filterValue = inputElement.value; // Caso seja disparado por um evento do input
  }

  this.tableDataSource.filter = filterValue.trim().toLowerCase();
  }

  getDynamicsData(nr_ocorrencia: string){
    this.carregando = true;
    const expression: RegExp = /NAT-[0-9]{8}-[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]/i;
    const result: boolean = expression.test(nr_ocorrencia);
    var json = [];
    if(result===true) {
      this.dynamicsService.tokenGenerate();
      this.returnDynamicsArray = [];
      setTimeout(() => {
        this.dynamicsService.getDynamicsData(nr_ocorrencia).subscribe(
          data => {
            this.returnDynamicsArray = data['value'];
            if(this.returnDynamicsArray.length===0){
              var message = `Sem dados`;
              var action = 'Fechar'
              this._snackBar.open(message, action);
              this.carregando = false;
            }
            else {

              var dataCriacaoDisplay = momentTimeZone.utc(this.returnDynamicsArray[0]["createdon"]).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");
              var dataSlaDisplay = momentTimeZone.utc(this.returnDynamicsArray[0]["nat_sladate"]).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm:ss");

              this.cliente = this.returnDynamicsArray[0]["ah.customerid@OData.Community.Display.V1.FormattedValue"];
              this.nr_documento = this.returnDynamicsArray[0]["a_93650777f846e811a83d000d3ac085f9.nat_documentnumber"];
              this.data_criacao = dataCriacaoDisplay;
              this.origem = this.returnDynamicsArray[0]["ah.caseorigincode@OData.Community.Display.V1.FormattedValue"];
              this.data_sla = dataSlaDisplay;
              this.status_atividade = this.returnDynamicsArray[0]["statecode@OData.Community.Display.V1.FormattedValue"];
              this.nome_favorecido = this.returnDynamicsArray[0]["ah.nat_favoredname"];
              this.agencia_numero = this.returnDynamicsArray[0]["ah.nat_numberagency"];
              this.conta_numero = this.returnDynamicsArray[0]["ah.nat_currentaccount"];
              this.endereco_favorecido_rua = this.returnDynamicsArray[0]["a_93650777f846e811a83d000d3ac085f9.address1_line1"]
              this.endereco_favorecido_cidade = this.returnDynamicsArray[0]["a_93650777f846e811a83d000d3ac085f9.address1_city"]
              this.endereco_favorecido_cep = this.returnDynamicsArray[0]["a_93650777f846e811a83d000d3ac085f9.address1_postalcode"]
              this.cpf_favorecido = this.returnDynamicsArray[0]["ah.nat_clientdocument"];
              this.carregando = false;
            }
          },
          (err: HttpErrorResponse) => {
            var message = `Erro ${err.status}: ${err.statusText}. Tente novamente`;
            var action = 'Fechar'
            this._snackBar.open(message, action);
            this.carregando = false;
          }
        )
      }, 2000);
    }
    else {
      var message = 'Número da ocorrência fora do padrão Dynamics (NAT-0000000-A0A0A0)';
      var action = 'Fechar'
      this._snackBar.open(message, action);
    }
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
    this.applyFilter('');

    setTimeout(() => {
      this.banco_pesquisa = '';
    });
  }

  reembolsoCriarRegistro(form: FormGroup){

    // Validação do token antes de registrarWaveTracking
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const decodeJwt = (token: string): any => {
      try {
        const payload = token.split('.')[1];
        let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return JSON.parse(atob(base64));
      } catch {
        return null;
      }
    };
    const isTokenValid = (token: string): boolean => {
      if (!token) return false;
      const decoded = decodeJwt(token);
      if (!decoded || !decoded.exp) return false;
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    };
    const registrarTracking = (token: string) => {
      this.painelService.registrarWaveTracking({
        pagina: this.title,
        url: this.router.url,
        usuario: this.user,
        acao: 'Inseriu um novo registro'
      });
    };
    if (isTokenValid(accessToken)) {
      registrarTracking(accessToken);
    } else if (isTokenValid(refreshToken)) {
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            registrarTracking(res.accessToken);
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.router.navigate(['/login']);
    }

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
      var data_criacao = moment.utc(form.controls['data_criacao'].value, "DD/MM/YYYY HH:mm:ss", true).format('YYYY-MM-DD HH:mm:ss');
      var origem = form.controls['origem'].value;
      var data_sla = moment.utc(form.controls['data_sla'].value, "DD/MM/YYYY HH:mm:ss", true).format('YYYY-MM-DD HH:mm:ss');
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
      var data_registro = moment().format('YYYY-MM-DD HH:mm:ss');
      var usuario = this.user;




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
        base_origem: base_origem,
        data_registro: data_registro,
        usuario: usuario
      }];

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
  }

  openStopDialog(){
    const dialogRef = this.dialog.open(ReembolsoStopDialogComponent, {
      width: '35em'
    });
  }


  exportaDadosOpenDialog(){
    const dialogRef = this.dialog.open(ReembolsoExportaDadosComponent, {
      width: '98vw',
      height: '80vh'
    });
  }

  autenticarOpenDialog(){
    this.autenticado = undefined;
    this.accountService.remove('autenticado');
    const dialogRef = this.dialog.open(ReembolsoAutenticacaoComponent, {
      width: '25vw',
      height: '40vh',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.autenticado = this.accountService.get('autenticado');
    });
  }

}
