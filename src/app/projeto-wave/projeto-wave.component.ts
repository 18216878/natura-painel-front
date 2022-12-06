import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { SuccessFormDialogComponent } from './success-form-dialog/success-form-dialog.component';
import { StopFormDialogComponent } from './stop-form-dialog/stop-form-dialog.component';

export interface IMailing {
  protocolo: string;
  data_reg: string;
  data_ini: string;
  data_fim: string;
  canal_id: number;
  pendente_id: number;
  tipo_conato_id: number;
  tentativa_contato_id: number;
  nivel_01_id?: number;
  nivel_02_id?: number;
  nivel_03_id?: number;
  nivel_04_id?: number;
  nivel_05_id?: number;
  nivel_06_id?: number;
  status_caso_id: number;
  erros_operacionais_id: number;
  login_dynamics?: string;
  matricula?: number;
  nome_agente?: string;
  nome_supervisor?: string;
  celula?: string;
  detalhe_contato: string;
  user_id: number;
}

var ELEMENT_DATA: IMailing[];




@Component({
  selector: 'app-projeto-wave',
  templateUrl: './projeto-wave.component.html',
  styleUrls: ['./projeto-wave.component.scss']
})
export class ProjetoWaveComponent implements OnInit {

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
  formularioProjetoWave: FormGroup;
  user: string;

  identificadores: string[] = ['Código Natura', 'Código Avon', 'CPF'];
  selecionado: string;

  checked = false;
  public title: string = "Projeto Wave";
  public codigo_natura?: string = "";
  public codigo_avon?: string = "";
  public cpf_cn_rep?: string = "";
  public cod_natura_mailing: string;
  public cod_avon_mailing: string;
  public cpf_mailing: string;
  public nome_mailing: string;
  public cep_mailing: string;
  public nivel_mailing: string;
  public estrutura_comercial_mailing: string;
  public data_cadastro_wave2_natura_mailing: string;
  public data_cadastro_wave2_avon_mailing: string;
  public email_mailing: string;

  displayedColumns: string[] = ['codigo_natura', 'codigo_avon', 'nome', 'cpf', 'cep', 'nivel', 'estrutura_comercial', 'data_cadastro_wave2_natura', 'data_cadastro_wave2_avon', 'email'];
  dataSource = ELEMENT_DATA;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
      this.formularioProjetoWave = this.formBuilder.group({
        selecionado:[''],
        codigo_natura:[''],
        codigo_avon:[''],
        cpf_cn_rep:[''],
        cod_natura_mailing:[''],
        cod_avon_mailing:[''],
        nome_mailing:[''],
        cpf_mailing:[''],
        cep_mailing:[''],
        nivel_mailing:[''],
        estrutura_comercial_mailing:[''],
        data_cadastro_wave2_natura_mailing:[''],
        data_cadastro_wave2_avon_mailing:[''],
        email_mailing:['']

      })

  }

  pesquisar() {
    if (this.selecionado=='Código Natura'){
      this.painelService.getNaturaCode(this.codigo_natura).subscribe(
        data => {
          this.cod_natura_mailing = data[0].codigo_natura;
          this.cod_avon_mailing = data[0].codigo_avon;
          this.nome_mailing = data[0].nome;
          var tratCpf = data[0].cpf.toString();
          var newCpf = tratCpf.padStart(11,0);
          this.cpf_mailing = newCpf;
          var tratCep = data[0].cep === null ? null : data[0].cep.toString();
          var newCep = data[0].cep === null ? null : tratCep.padStart(8,0);
          this.cep_mailing = newCep;
          this.nivel_mailing = data[0].nivel;
          this.estrutura_comercial_mailing = data[0].estrutura_comercial;
          this.email_mailing = data[0].email;
         
          if(data[0].data_cadastro_wave2_natura != null) {
            this.data_cadastro_wave2_natura_mailing = data[0].data_cadastro_wave2_natura.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_natura.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_natura.substring(0,4);

          }

          if(data[0].data_cadastro_wave2_avon != null) {
            this.data_cadastro_wave2_avon_mailing = data[0].data_cadastro_wave2_avon.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_avon.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_avon.substring(0,4);

          }

        }
      )
    }
    else if (this.selecionado=='Código Avon'){
      this.painelService.getAvonCode(this.codigo_avon).subscribe(
        data => {
          this.cod_natura_mailing = data[0].codigo_natura;
          this.cod_avon_mailing = data[0].codigo_avon;
          this.nome_mailing = data[0].nome;
          var tratCpf = data[0].cpf.toString();
          var newCpf = tratCpf.padStart(11,0);
          this.cpf_mailing = newCpf;
          var tratCep = data[0].cep === null ? null : data[0].cep.toString();
          var newCep = data[0].cep === null ? null : tratCep.padStart(8,0);
          this.cep_mailing = newCep;
          this.nivel_mailing = data[0].nivel;
          this.estrutura_comercial_mailing = data[0].estrutura_comercial;
          this.email_mailing = data[0].email;
         
          if(data[0].data_cadastro_wave2_natura != null) {
            this.data_cadastro_wave2_natura_mailing = data[0].data_cadastro_wave2_natura.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_natura.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_natura.substring(0,4);

          }

          if(data[0].data_cadastro_wave2_avon != null) {
            this.data_cadastro_wave2_avon_mailing = data[0].data_cadastro_wave2_avon.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_avon.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_avon.substring(0,4);

          }

        }
      )
    }
    else if (this.selecionado=='CPF'){
      var auxCpf = this.cpf_cn_rep.replace('.','').replace('-','');
      var cpfFormat = parseInt(auxCpf).toString();
      this.painelService.getCpf(cpfFormat).subscribe(
        data => {
          this.cod_natura_mailing = data[0].codigo_natura;
          this.cod_avon_mailing = data[0].codigo_avon;
          this.nome_mailing = data[0].nome;
          var tratCpf = data[0].cpf.toString();
          var newCpf = tratCpf.padStart(11,0);
          this.cpf_mailing = newCpf;
          var tratCep = data[0].cep === null ? null : data[0].cep.toString();
          var newCep = data[0].cep === null ? null : tratCep.padStart(8,0);
          this.cep_mailing = newCep;
          this.nivel_mailing = data[0].nivel;
          this.estrutura_comercial_mailing = data[0].estrutura_comercial;
          this.email_mailing = data[0].email;
         
          if(data[0].data_cadastro_wave2_natura != null) {
            this.data_cadastro_wave2_natura_mailing = data[0].data_cadastro_wave2_natura.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_natura.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_natura.substring(0,4);

          }

          if(data[0].data_cadastro_wave2_avon != null) {
            this.data_cadastro_wave2_avon_mailing = data[0].data_cadastro_wave2_avon.substring(8,10) + '/' + 
            data[0].data_cadastro_wave2_avon.substring(5,7) + '/' +
            data[0].data_cadastro_wave2_avon.substring(0,4);

          }

        }
      )
    }
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioProjetoWave.reset();
    this.selecionado = null;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;    
    
  }



}
