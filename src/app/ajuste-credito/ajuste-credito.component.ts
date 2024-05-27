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
  cod_cn: number;
  cliente: string;
  cod_setor: number;
  plano_cresc: string;
  limite_credito: number;
  tipo: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-ajuste-credito',
  templateUrl: './ajuste-credito.component.html',
  styleUrls: ['./ajuste-credito.component.scss']
})
export class AjusteCreditoComponent implements OnInit {

  displayedColumns: string[] = [
    'cod_cn',
    'cliente',
    'cod_setor',
    'plano_cresc',
    'limite_credito',
    'tipo'
  ]

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

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  storage: Storage;
  router: Router;
  formularioAtrasoEntrega: FormGroup;
  user: string;

  public title: string = "Ajustes Crédito";
  public cod_cn?: string = "";

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioAtrasoEntrega = this.formBuilder.group({
      cod_cn:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisaCodigoConsultora(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoConsultora = this.cod_cn;

    this.painelService.getAjusteCredito(codigoConsultora).subscribe(
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
    this.formularioAtrasoEntrega.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

}
