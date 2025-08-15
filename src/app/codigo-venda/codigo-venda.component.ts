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
  marca: string;
  descricao: string;
  linha_produto: string;
  categorizacao: string;
  status: string;
  codigo_venda: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-codigo-venda',
  templateUrl: './codigo-venda.component.html',
  styleUrls: ['./codigo-venda.component.scss']
})
export class CodigoVendaComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = [
    'id',
    'marca',
    'descricao',
    'linha_produto',
    'categorizacao',
    'status',
    'codigo_venda'
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

  public title: string = "Código de Produtos";
  public marca?: string = "";
  public descricao?: string = "";
  public linha_produto?: string = "";
  public categorizacao?: string = "";

  identificadores: string[] = ['Marca', 'Descrição', 'Linha de Produto', 'Categorização'];
  selecionado: string;

  public carregando: boolean;

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
    this.formularioCalendarioCiclos = this.formBuilder.group({
      selecionado:[''],
      marca:[''],
      descricao:[''],
      linha_produto:[''],
      categorizacao:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  codigoVendaMarca() {

    this.pesquisa_efetuada = false;
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
        campoPesquisa: 'marca',
        valorPesquisa: this.marca,
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
    this.carregando = true;


    this.painelService.getCodigoVendaMarca(this.marca).subscribe(
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

  codigoVendaDescricao() {

    this.pesquisa_efetuada = false;
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
        campoPesquisa: 'descricao',
        valorPesquisa: this.descricao,
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
    this.carregando = true;


    this.painelService.getCodigoVendaDescricao(this.descricao).subscribe(
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

  codigoVendaLinhaProduto() {

    this.pesquisa_efetuada = false;
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
        campoPesquisa: 'linha_produto',
        valorPesquisa: this.linha_produto,
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
    this.carregando = true;


    this.painelService.getCodigoVendaLinhaProduto(this.linha_produto).subscribe(
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

  codigoVendaCategorizacao() {

    this.pesquisa_efetuada = false;
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
        campoPesquisa: 'categorizacao',
        valorPesquisa: this.categorizacao,
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
    this.carregando = true;


    this.painelService.getCodigoVendaCategorizacao(this.categorizacao).subscribe(
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
