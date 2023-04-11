import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { MecanicaComponent } from './mecanica/mecanica.component';

export interface PeriodicElement {
  id: number;
  ano: number;
  codigo: number;
  nome_completo: string;
  sexo: string;
  status: string;
  nivel: string;
  gm: string;
  cod_re: number;
  nome_re: string;
  cod_gv: number;
  gv: string;
  cod_setor: number;
  setor: string;
  cod_setor_atual: number;
  nm_setor_atual: string;
  cod_gv_atual: number;
  nm_gv_atual: string;
  categorias_conquistadas: string;
  consolidado_reconhecimento: string;
  pontos_posicao_re: number;
  pontos_posicao_gv: number;
  pontos_posicao_setor: number;
  pontos_marco: string;
  pontos_evento_sp: string;
  pontos_convencao: string;
  superacao_posicao_re: number;
  superacao_posicao_gv: number;
  superacao_posicao_setor: number;
  superacao_marco: string;
  superacao_evento_sp: string;
  superacao_convencao: string;
  cpv_posicao_re: number;
  cpv_posicao_setor: number;
  cpv_marco: string;
  cpv_evento_sp: string;
  cpv_convencao: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.scss']
})
export class DestaquesComponent implements OnInit {

  displayedColumns: string[] = [
    'codigo',
    'nome_completo',
    'sexo',
    'status',
    'nivel',
    'gm',
    'cod_re',
    'nome_re',
    'cod_gv',
    'gv',
    'cod_setor',
    'setor',
    'cod_setor_atual',
    'nm_setor_atual',
    'cod_gv_atual',
    'nm_gv_atual',
    'categorias_conquistadas',
    'consolidado_reconhecimento',
    'pontos_posicao_re',
    'pontos_posicao_gv',
    'pontos_posicao_setor',
    'pontos_marco',
    'pontos_evento_sp',
    'pontos_convencao',
    'superacao_posicao_re',
    'superacao_posicao_gv',
    'superacao_posicao_setor',
    'superacao_marco',
    'superacao_evento_sp',
    'superacao_convencao',
    'cpv_posicao_re',
    'cpv_posicao_setor',
    'cpv_marco',
    'cpv_evento_sp',
    'cpv_convencao'
    
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
  formularioDestaques: FormGroup;
  user: string;

  public title: string = "Destaques 2022";
  public codigo?: string = "";
  public nome?: string = "";
  identificadores: string[] = ['Código', 'Nome Completo'];
  selecionado: string;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioDestaques = this.formBuilder.group({
      selecionado:[''],
      codigo:[''],      
      nome:['']      
    })
  }

  pesquisarCodigo() {

    var codigo = parseInt(this.codigo);
    this.pesquisa_efetuada = true;
    this.painelService.getDestaquesCodigo(codigo).subscribe(
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

  pesquisarNome() {

    this.pesquisa_efetuada = true;
    this.painelService.getDestaquesNome(this.nome).subscribe(
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
    this.formularioDestaques.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    this.codigo = undefined;
    this.nome = undefined;   
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(MecanicaComponent, {
      width: '55em'
    });

  }



}
