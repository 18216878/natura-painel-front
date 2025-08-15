import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  cd_mensagem: string;
  dc_mensagem: string;
  tipo_estrutura: number;
  cd_estrutura_comercial: string;
  nome_estrutura: number;
  nm_ciclo_operacional_inicio: string;
  nm_ciclo_operacional_termino: string;
  dt_inicio: Date;
  dt_termino: Date;
  tipo_mensagem: string;
  tipo_item_original: string;
  item_original: string;
  composicao_item_original: string;
  nome_composicao_item_original: string;
  tipo_item_original_2: string;
  item_substituto: string;
  composicao_item_substituto: string;
  nome_composicao_item_substitut: string;
  exibe_box_troca_informa: string;
  qtde_registros_por_mensagem: string;
  data_execucao_da_query: Date;

}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-plano-b-trocas',
  templateUrl: './plano-b-trocas.component.html',
  styleUrls: ['./plano-b-trocas.component.scss']
})
export class PlanoBTrocasComponent implements OnInit {

  private mapApiDataToTable(data: any[]): any[] {
    return data.map(item => ({
      cd_mensagem: item.CD_MENSAGEM,
      dc_mensagem: item.DC_MENSAGEM,
      tipo_estrutura: item.TIPO_ESTRUTURA,
      cd_estrutura_comercial: item.CD_ESTRUTURA_COMERCIAL,
      nome_estrutura: item.NOME_ESTRUTURA,
      nm_ciclo_operacional_inicio: item.NM_CICLO_OPERACIONAL_INICIO,
      nm_ciclo_operacional_termino: item.NM_CICLO_OPERACIONAL_TERMINO,
      dt_inicio: item.DT_INICIO,
      dt_termino: item.DT_TERMINO,
      tipo_mensagem: item.TIPO_MENSAGEM,
      tipo_item_original: item.TIPO_ITEM_ORIGINAL,
      item_original: item.ITEM_ORIGINAL,
      composicao_item_original: item.COMPOSICAO_ITEM_ORIGINAL,
      nome_composicao_item_original: item.NOME_COMPOSICAO_ITEM_ORIGINAL,
      tipo_item_original_2: item.TIPO_ITEM_ORIGINAL_2,
      item_substituto: item.ITEM_SUBSTITUTO,
      composicao_item_substituto: item.COMPOSICAO_ITEM_SUBSTITUTO,
      nome_composicao_item_substitut: item.NOME_COMPOSICAO_ITEM_SUBSTITUT,
      exibe_box_troca_informa: item.EXIBE_BOX_TROCA_INFORMA,
      qtde_registros_por_mensagem: item.QTDE_REGISTROS_POR_MENSAGEM,
      data_execucao_da_query: item.DATA_EXECUCAO_DA_QUERY
    }));
  }

  displayedColumns: string[] = [
    'cd_mensagem',
    'dc_mensagem',
    'tipo_estrutura',
    'cd_estrutura_comercial',
    'nome_estrutura',
    'nm_ciclo_operacional_inicio',
    'nm_ciclo_operacional_termino',
    'dt_inicio',
    'dt_termino',
    'tipo_mensagem',
    'tipo_item_original',
    'item_original',
    'composicao_item_original',
    'nome_composicao_item_original',
    'tipo_item_original_2',
    'item_substituto',
    'composicao_item_substituto',
    'nome_composicao_item_substitut',
    'exibe_box_troca_informa',
    'qtde_registros_por_mensagem',
    'data_execucao_da_query'
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
  formularioPlanoBeTrocas: FormGroup;
  user: string;

  public title: string = "Planos B e Trocas";
  public item_original?: string = "";
  public item_substituto?: string = "";
  identificadores: string[] = ['Item Original', 'Item Substituto'];
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

    this.formularioPlanoBeTrocas = this.formBuilder.group({
      selecionado:[''],
      item_original:[''],
      item_substituto:['']
    })
  }

  pesquisarIO() {
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
        campoPesquisa: 'item_original',
        valorPesquisa: this.item_original,
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
    this.painelService.getPlanosBeTrocasIO(this.item_original).subscribe(
      data => {
        this.dataSource = this.mapApiDataToTable(data);
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action);
        }
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action);
      }
    )
  }

  pesquisarIS() {
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
        campoPesquisa: 'item_substituto',
        valorPesquisa: this.item_substituto,
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
    this.painelService.getPlanosBeTrocasIS(this.item_substituto).subscribe(
      data => {
        this.dataSource = this.mapApiDataToTable(data);
        if (this.dataSource.length === 0) {
          var message = 'Sem dados';
          var action = 'Fechar';
          this._snackBar.open(message, action);
        }
      },
      err => {
        var message = 'Erro durante a pesquisa. Tente novamente';
        var action = 'Fechar'
        this._snackBar.open(message, action);
      }
    )
  }


  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioPlanoBeTrocas.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;

  }

}
