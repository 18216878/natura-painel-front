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
  codigo: number;
  nome_completo: string;
  codigo_setor: number;
  nr_pedido: number;
  ciclo: number;
  codigo_produto_reparado: string;
  descricao_produto_reparado: string;
  marca_produto: string;
  tipo_reparacao: string;
  quantidade_valor_reparado: string;
  data_reparacao: string;
  reparacao_qual_pedido: string;
  foi_ressarcido: string;
  motivo_reparacao: string;
  orientacao_beedoo: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-reparacao',
  templateUrl: './reparacao.component.html',
  styleUrls: ['./reparacao.component.scss']
})
export class ReparacaoComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'codigo',
    'nome_completo',
    'codigo_setor',
    'nr_pedido',
    'ciclo',
    'codigo_produto_reparado',
    'descricao_produto_reparado',
    'marca_produto',
    'tipo_reparacao',
    'quantidade_valor_reparado',
    'data_reparacao',
    'reparacao_qual_pedido',
    'foi_ressarcido',
    'motivo_reparacao',
    'orientacao_beedoo'
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
    formularioCheckout: FormGroup;
    user: string;

    public title: string = "Reparação";
    public cod_consultora?: string = "";
    public nome?: string = "";
    public nr_pedido?: string = "";

    identificadores: string[] = ['Código da Consultora', 'Nome da Consultora', 'Número do Pedido'];
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

    this.formularioCheckout = this.formBuilder.group({
      selecionado:[''],
      codigo:[''],
      nome:[''],
      nr_pedido:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigo(){

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
        campoPesquisa: 'cod_consultora',
        valorPesquisa: this.cod_consultora,
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

        var codigoConsultora = parseInt(this.cod_consultora);

        this.painelService.getReparacaoCodigo(codigoConsultora).subscribe(
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

  pesquisarNome(){

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
        campoPesquisa: 'nome',
        valorPesquisa: this.nome,
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

        this.painelService.getReparacaoNome(this.nome).subscribe(
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

  pesquisarPedido(){

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
        campoPesquisa: 'nr_pedido',
        valorPesquisa: this.nr_pedido,
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

        var pedido = parseInt(this.nr_pedido);

        this.painelService.getReparacaoPedido(pedido).subscribe(
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
      this.formularioCheckout.reset();
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
