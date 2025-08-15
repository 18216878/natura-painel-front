import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  agencia_origem: number;
  conta: number;
  dac: number;
  cpf: string;
  data_pagamento: Date;
  data_devolucao: Date;
  carteira: number;
  nosso_numero: number;
  valor_liquidado: number;
  banco_pagamento: string;
  agencia_pagamento: number;
  cod_barras: string;
  motivo_devolucao: string;
  consultora: string;
  titulo: number;
  parcela: number;
  valor: number;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-pagamentos-rejeitados',
  templateUrl: './pagamentos-rejeitados.component.html',
  styleUrls: ['./pagamentos-rejeitados.component.scss']
})
export class PagamentosRejeitadosComponent implements OnInit {

  displayedColumns: string[] = [
    'agencia_origem',
    'conta',
    'dac',
    'data_pagamento',
    'data_devolucao',
    'carteira',
    'nosso_numero',
    'valor_liquidado',
    'banco_pagamento',
    'agencia_pagamento',
    'cod_barras',
    'motivo_devolucao',
    'consultora',
    'titulo',
    'parcela',
    'valor'
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
  formularioPagamentosRejeitados: FormGroup;
  user: string;

  public title: string = "Pagamentos Rejeitados";
  public codigo_cn?: string = "";



  ngOnInit(): void {
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
    this.user = this.accountService.get('user')?.toString();
    this.formularioPagamentosRejeitados = this.formBuilder.group({
      codigo_cn:['']
    })
  }

  pesquisar() {
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
        campoPesquisa: 'codigo',
        valorPesquisa: this.codigo_cn,
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

    this.pesquisa_efetuada = true;
    this.painelService.getPagamentosRejeitados(this.codigo_cn).subscribe(
      data => {
        this.dataSource = data;
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action, { duration: 3000 });
        }
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action, { duration: 3000 });
      }
    )
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioPagamentosRejeitados.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
