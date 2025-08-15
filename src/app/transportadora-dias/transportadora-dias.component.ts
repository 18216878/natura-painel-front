import { Component, NgZone, AfterViewInit, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import 'moment/locale/pt-br';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  cod_pedido: number;
  centro_dist: number;
  cod_re: string;
  nome_re: string;
  cod_gv: string;
  nome_gv: string;
  cod_setor: string;
  nome_setor: string;
  transp: string;
  rota: number;
  cidade: string;
  uf: string;
  pedido: number;
  doc_vendas: number;
  tipo_pedido: string;
  cond_expedicao: number;
  presente: string;
  status_crm: string;
  remessa: number;
  fatura: number;
  hora_faturamento: string;
  prioridade: number;
  item_transito: string;
  ciclo: string;
  num_emb: number;
  meio_captacao: string;
  situacao: string;
  linha: number;
  nr_palete: string;
  horario_envio_linha: string;
  hora_separacao: string;
  codigo_cn: string;
  nome_cn: string;
  hora_criacao_remessa: string;
  hora_plano_separacao: string;
  data_faturamento: string;
  data_envio_linha: string;
  data_separacao: string;
  data_digitacao: string;
  data_pedido: string;
  data_liberacao_credito: string;
  data_limite_lib_credito: string;
  data_criacao_remessa: string;
  data_plano_separacao: string;
  data_prevista_entrega: string;
  zona_transporte: string;
  trp: string;
  trp2: string;
  telefone: string;

}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-transportadora-dias',
  templateUrl: './transportadora-dias.component.html',
  styleUrls: ['./transportadora-dias.component.scss']
})
export class TransportadoraDiasComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = [
  'cod_pedido',
  'centro_dist',
  'cod_re',
  'nome_re',
  'cod_gv',
  'nome_gv',
  'cod_setor',
  'nome_setor',
  'transp',
  'rota',
  'cidade',
  'uf',
  'pedido',
  'doc_vendas',
  'tipo_pedido',
  'cond_expedicao',
  'presente',
  'status_crm',
  'remessa',
  'fatura',
  'hora_faturamento',
  'prioridade',
  'item_transito',
  'ciclo',
  'num_emb',
  'meio_captacao',
  'situacao',
  'linha',
  'nr_palete',
  'horario_envio_linha',
  'hora_separacao',
  'codigo_cn',
  'nome_cn',
  'hora_criacao_remessa',
  'hora_plano_separacao',
  'data_faturamento',
  'data_envio_linha',
  'data_separacao',
  'data_digitacao',
  'data_pedido',
  'data_liberacao_credito',
  'data_limite_lib_credito',
  'data_criacao_remessa',
  'data_plano_separacao',
  'data_prevista_entrega',
  'zona_transporte',
  'trp',
  'trp2',
  'telefone'
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
  formularioTransportadoraDias: FormGroup;
  user: string;

  public title: string = "Problemas Sistêmicos com a Transportadora Dias";
  public codigo_cn?: string = "";
  public pedido?: string = "";

  identificadores: string[] = ['Código da CN', 'Nº do Pedido'];
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

    this.formularioTransportadoraDias = this.formBuilder.group({
      selecionado:[''],
      codigo_cn:[''],
      pedido:['']
    })

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigoCn() {

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
        campoPesquisa: 'codigo_cn',
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

    this.pesquisa_efetuada = false;
    this.carregando = true;

    this.painelService.getDiasCodigoCn(this.codigo_cn).subscribe(
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

  pesquisarPedido() {

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
        campoPesquisa: 'pedido',
        valorPesquisa: this.pedido,
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

    var nrPedido = parseInt(this.pedido);

    this.painelService.getDiasPedido(nrPedido).subscribe(
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
    this.formularioTransportadoraDias.reset();
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
