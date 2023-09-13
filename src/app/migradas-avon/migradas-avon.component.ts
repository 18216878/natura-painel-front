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
import { ExcelService } from '../excel.service';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

export interface PeriodicElement {
  cd_consultora: number;
  nome_consultora: string;
  cd_grupo_final: number;
  cd_setor_final: number;
  cd_gv_final: number;
  cd_re_final: number;
  fechamento_avon: string;
  data_inicio: string;
  diff: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-migradas-avon',
  templateUrl: './migradas-avon.component.html',
  styleUrls: ['./migradas-avon.component.scss']
})
export class MigradasAvonComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'cd_consultora',
    'nome_consultora',
    'cd_grupo_final',
    'cd_setor_final',
    'cd_gv_final',
    'cd_re_final',
    'fechamento_avon',
    'data_inicio',
    'diff'
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
    private excelService: ExcelService,
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
  formularioMigradasAvon: FormGroup;
  user: string;

  public title: string = "Consultoras Migradas Avon";
  public cd_consultora?: string = "";

  public carregando: boolean;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    this.formularioMigradasAvon = this.formBuilder.group({
      cd_consultora:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  pesquisaCodigoConsultora(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    var codigoConsultora = parseInt(this.cd_consultora);

    this.painelService.getNatMigradasAvonCodigoConsultora(codigoConsultora).subscribe(
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
    this.formularioMigradasAvon.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

}
