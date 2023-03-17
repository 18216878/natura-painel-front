import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  codigo_natura: string;
  codigo_avon: string;
  cpf: number;
  nome: string;
  cep: number;
  nivel: string;
  estrutura_comercial: string;
  data_cadastro_wave2_natura: Date;
  data_cadastro_wave2_avon: Date;
  email: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-projeto-wave',
  templateUrl: './projeto-wave.component.html',
  styleUrls: ['./projeto-wave.component.scss']
})
export class ProjetoWaveComponent implements OnInit {

  displayedColumns: string[] = ['codigo_natura', 'codigo_avon', 'nome', 'cpf', 'cep', 'nivel', 'estrutura_comercial', 'data_cadastro_wave2_natura', 'data_cadastro_wave2_avon', 'email'];
  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  
  constructor(
    private _ngZone: NgZone, 
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioProjetoWave: FormGroup;
  user: string;

  identificadores: string[] = ['Código Natura', 'Código Avon', 'CPF'];
  selecionado: string;
  public pesquisa_efetuada: boolean = false;

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

    this.pesquisa_efetuada = true;
    if (this.selecionado=='Código Natura'){
      this.painelService.getNaturaCode(this.codigo_natura).subscribe(
        data => {
          this.dataSource = data;
          if (this.dataSource.length === 0) {
            var message = 'Sem dados';
            var action = 'Fechar';
            this._snackBar.open(message, action);
          }
        },
        err => {
          var message = 'Erro durante a pesquisa. Tente novamente';     
          var action = 'Fechar'     
          this._snackBar.open(message, action);
        }
      )
    }
    else if (this.selecionado=='Código Avon'){
      this.painelService.getAvonCode(this.codigo_avon).subscribe(
        data => {
          this.dataSource = data;
        }
      )
    }
    else if (this.selecionado=='CPF'){
      var auxCpf = this.cpf_cn_rep.replace('.','').replace('-','');
      var cpfFormat = parseInt(auxCpf).toString();
      this.painelService.getCpf(cpfFormat).subscribe(
        data => {
          this.dataSource = data;
        }
      )
    }
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioProjetoWave.reset();
    this.selecionado = null;
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;    
    
  }
  
}
