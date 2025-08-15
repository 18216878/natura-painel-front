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
  cd_titulo: number;
  cd_ger_venda: string;
  cd_setor: string;
  dtvenc: string;
  novo_vcto: string;
  nova_data_entrega: string;
  cn: string;
  venc_or: string;
  bco_emp: string;
  nr_pedido: number;
  status_titulo: string;
  limite_credito: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-atraso-entrega',
  templateUrl: './atraso-entrega.component.html',
  styleUrls: ['./atraso-entrega.component.scss']
})
export class AtrasoEntregaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'cd_titulo',
    'cd_ger_venda',
    'cd_setor',
    'nr_parc',
    'dtvenc',
    'novo_vcto',
    'nova_data_entrega',
    'cn',
    'venc_or',
    'bco_emp',
    'nr_pedido',
    'status_titulo',
    'limite_credito'
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
    private router: Router,
    private accountService: AccountService,
    private _snackBar: MatSnackBar
  ) {
    this.storage = window.localStorage;
    window.scroll(0, 0);
  }



  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  storage: Storage;
  formularioAtrasoEntrega: FormGroup;
  user: string;

  public title: string = "Atraso na Entrega Pedidos Avon";
  public cn?: string = "";

  public carregando: boolean;


  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
    this.formularioAtrasoEntrega = this.formBuilder.group({
      cn:['']
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

  pesquisaCodigoConsultora() {
    this.pesquisa_efetuada = false;
    this.carregando = true;

    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const codigoConsultora = this.cn;

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
        campoPesquisa: 'cn',
        valorPesquisa: codigoConsultora,
        acao: 'Efetuou pesquisa'
      });
    };

    if (isTokenValid(accessToken)) {
      registrarTracking(accessToken);
      this.painelService.getAtrasoEntregaComToken(codigoConsultora, accessToken).subscribe(
        data => {
          this.dataSource = data;
          this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
          this.tableDataSource.paginator = this.paginator;
          if (this.dataSource.length === 0) {
            var message = 'Sem dados';
            var action = 'Fechar';
            this._snackBar.open(message, action, { duration: 3000 });
          }
          this.carregando = false;
          this.pesquisa_efetuada = true;
        },
        err => {
          var message = 'Erro durante a pesquisa. Tente novamente';
          var action = 'Fechar';
          this._snackBar.open(message, action, { duration: 3000 });
          this.carregando = false;
          this.pesquisa_efetuada = true;
        }
      );
    } else if (isTokenValid(refreshToken)) {
      // Se accessToken expirou, tenta renovar com refreshToken
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            this.painelService.getAtrasoEntregaComToken(codigoConsultora, res.accessToken).subscribe(
              data => {
                this.dataSource = data;
                this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
                this.tableDataSource.paginator = this.paginator;
                if (this.dataSource.length === 0) {
                  var message = 'Sem dados';
                  var action = 'Fechar';
                  this._snackBar.open(message, action, { duration: 3000 });
                }
                this.carregando = false;
                this.pesquisa_efetuada = true;
              },
              err => {
                var message = 'Erro durante a pesquisa. Tente novamente';
                var action = 'Fechar';
                this._snackBar.open(message, action, { duration: 3000 });
                this.carregando = false;
                this.pesquisa_efetuada = true;
              }
            );
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => {
          this.router.navigate(['/login']);
        }
      );
    } else {
      // Se refreshToken também expirou, redireciona
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
