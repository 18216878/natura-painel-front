import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  data_inicio: Date;
  codigo: number;
  nome: string;
  cpf: string;
  email: string;
  espaco_digital: string;
  status: string;
  data_envio_notificacao: Date;
  data_ultima_interacao_cn: Date;
  orientacao_atendimento_n1: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-cadastros-irregulares',
  templateUrl: './cadastros-irregulares.component.html',
  styleUrls: ['./cadastros-irregulares.component.scss']
})
export class CadastrosIrregularesComponent implements OnInit {

  displayedColumns: string[] = [
    'data_inicio',
    'codigo',
    'nome',
    'cpf',
    'email',
    'espaco_digital',
    'status',
    'data_envio_notificacao',
    'data_ultima_interacao_cn',
    'orientacao_atendimento_n1'
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
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) { 
    this.router = router;
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }

  storage: Storage;
  router: Router;
  formularioCadastrosIrregulares: FormGroup;
  user: string;

  public title: string = "Cadastros Irregulares";
  public codigo_cn?: string = "";

  

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCadastrosIrregulares = this.formBuilder.group({
      codigo_cn:['']      
    })
  }

  pesquisar() {

    this.pesquisa_efetuada = true;
    this.painelService.getCadastrosIrregulares(this.codigo_cn).subscribe(
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

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioCadastrosIrregulares.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
