import { Component, NgZone, AfterViewInit, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  id: number;
  regiao: string;
  divisao: string;
  setor: number;
  equipe: string;
  registro: number;
  nome: string;
  cps_bloqueadas: string;
  valor_comissao_bloq: string;
  status_dicas_mei: string;
  status_credencial: string;
  situacao_cnpj: string;
  pagtos_retro_aeps: string;
  data_aeps: string;
  pagamento_bloqueado: string;
  data_importacao: Date;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-regularizacao-mei',
  templateUrl: './regularizacao-mei.component.html',
  styleUrls: ['./regularizacao-mei.component.scss']
})
export class RegularizacaoMeiComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'regiao',
    'divisao',
    'setor',
    'equipe',
    'registro',
    'nome',
    'cps_bloqueadas',
    'valor_comissao_bloq',
    'status_dicas_mei',
    'status_credencial',
    'situacao_cnpj',
    'pagtos_retro_aeps',
    'data_aeps',
    'pagamento_bloqueado',
    'data_importacao'
  ];

  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
  
  tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
  formularioRejeicaoPagamento: FormGroup;
  user: string;

  public title: string = "Ação de Regularização MEI";
  public registro?: string = "";
  public nome?: string = "";

  identificadores: string[] = ['Registro', 'Nome'];
  selecionado: string;
  
  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioRejeicaoPagamento = this.formBuilder.group({
      selecionado:[''],
      registro:[''],      
      nome:['']     
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarRegistro() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var reg = parseInt(this.registro);
    this.painelService.getMeiRegistro(reg).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action);
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';     
        var action = 'Fechar'     
        this._snackBar.open(message, action);
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  pesquisarNome() {

    this.pesquisa_efetuada = true;
    this.carregando = true;
    
    this.painelService.getMeiNome(this.nome).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action);
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';     
        var action = 'Fechar'     
        this._snackBar.open(message, action);
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioRejeicaoPagamento.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }
    

}
