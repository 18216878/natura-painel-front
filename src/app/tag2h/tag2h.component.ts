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
  programa: string;
  ano: number;
  cp_inicial: string;
  cp_final: string;
  ln: string;
  premio: string;
  fscode: number;
  acao_final: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-tag2h',
  templateUrl: './tag2h.component.html',
  styleUrls: ['./tag2h.component.scss']
})
export class Tag2hComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'programa',
    'ano',
    'cp_inicial',
    'cp_final',
    'ln',
    'premio',
    'fscode',
    'acao_final'
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
  formularioTag2h: FormGroup;
  user: string;

  public title: string = "Avon T2G";
  public ano?: string = "";
  public cpInicial?: string = "";
  public premio?: string = "";
  public carregando: boolean;
  identificadores: string[] = ['Ano', 'CP Inicial', 'Prêmio' ];
  selecionado: string;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();

    // Validação do token antes de registrarWaveTracking
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

    this.formularioTag2h = this.formBuilder.group({
      selecionado:[''],
      ano:[''],
      cpInicial:[''],
      premio:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarAno() {

    // Validação do token antes de registrarWaveTracking
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
        campoPesquisa: 'ano',
        valorPesquisa: this.ano,
        acao: 'Efetuou pesquisa'
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

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var year = parseInt(this.ano);
    this.painelService.getAvonTag2hAno(year).subscribe(
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

  pesquisarCpInicial() {

    // Validação do token antes de registrarWaveTracking
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
        campoPesquisa: 'cpInicial',
        valorPesquisa: this.cpInicial,
        acao: 'Efetuou pesquisa'
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

    this.pesquisa_efetuada = false;
    this.carregando = true;

    var year = parseInt(this.ano);
    this.painelService.getAvonTag2hAno(year).subscribe(
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

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getAvonTag2hCpInicial(this.cpInicial).subscribe(
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

  pesquisarPremio() {

    // Validação do token antes de registrarWaveTracking
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
        campoPesquisa: 'premio',
        valorPesquisa: this.premio,
        acao: 'Efetuou pesquisa'
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

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getAvonTag2hPremio(this.premio).subscribe(
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
    this.formularioTag2h.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    this.ano = undefined;
    this.cpInicial = undefined;
    this.premio = undefined;
    this.tableDataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.tableDataSource.paginator = this.paginator;

  }

}
