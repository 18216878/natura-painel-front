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
  cpf: string;
  cod_cn: number;
  data_implantacao: string;
  status_conta: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-emana-pay',
  templateUrl: './emana-pay.component.html',
  styleUrls: ['./emana-pay.component.scss']
})
export class EmanaPayComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'cpf',
    'cod_cn',
    'data_implantacao',
    'status_conta'
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
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  storage: Storage;
  router: Router;
  formularioCalendarioCiclos: FormGroup;
  user: string;

  public title: string = "Emana Pay";
  public cod_cn?: string = "";
  public cpf?: string = "";

  identificadores: string[] = ['CPF', 'Código da Consultora'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      cpf:[''],
      cod_cn:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  emanaPayCpf() {

    this.pesquisa_efetuada = false;
    this.carregando = true;


    this.painelService.getNatEmanaPayCpf(this.cpf).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action, {
            duration: 3000
          });
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action, {
          duration: 3000
        });
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  emanaPayCodCn() {

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigo = parseInt(this.cod_cn);

    this.painelService.getNatEmanaPayCodigoCn(codigo).subscribe(
      data => {
        this.dataSource = data;
        this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
        this.tableDataSource.paginator = this.paginator;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action, {
            duration: 3000
          });
        }
        this.carregando = false;
        this.pesquisa_efetuada = true;
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action, {
          duration: 3000
        });
        this.carregando = false;
        this.pesquisa_efetuada = true;
      }
    )

  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioCalendarioCiclos.reset();
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
