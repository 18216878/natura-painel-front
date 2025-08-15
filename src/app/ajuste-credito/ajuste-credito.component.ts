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

    // Verificação de token antes de registrarWaveTracking
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
  }

  pesquisaCodigoConsultora(){
    this.pesquisa_efetuada = false;
    this.carregando = true;

    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const codigoConsultora = this.cod_cn;

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
        campoPesquisa: 'cod_cn',
        valorPesquisa: codigoConsultora,
        acao: 'Efetuou pesquisa'
      });
    };

    if (isTokenValid(accessToken)) {
      registrarTracking(accessToken);
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
    } else if (isTokenValid(refreshToken)) {
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            registrarTracking(res.accessToken);
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
