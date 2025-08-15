import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  cod_gm: number;
  nome_gm: string;
  cod_re: number;
  nome_re: string;
  cod_gv: number;
  nome_gv: string;
  cod_setor: number;
  nome_setor: string;
  cod_grupo: number;
  nome_completo: number;
  situacao_vale_pontos: string;
  motivo_inativacao_vale_pontos: string;
  data_inativacao_vale_pontos: Date;
  qtde_vale_pontos: number;
  qtde_pontos_unitarios: number;
  numero_pedido_conquista: number;
  ciclo_pedido_conquista: number;
  data_conquista: Date;
  numero_pedido_processamento: number;
  ciclo_pedido_processamento: number;
  ciclo_inicio: number;
  ciclo_termino: number;
  nome_campanha: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-pesquisa-nordeste',
  templateUrl: './pesquisa-nordeste.component.html',
  styleUrls: ['./pesquisa-nordeste.component.scss']
})
export class PesquisaNordesteComponent implements OnInit{

  displayedColumns: string[] = [
    'cod_gm',
    'nome_gm',
    'cod_re',
    'nome_re',
    'cod_gv',
    'nome_gv',
    'cod_setor',
    'nome_setor',
    'cod_grupo',
    'cod_consultora',
    'nome_completo',
    'situacao_vale_pontos',
    'motivo_inativacao_vale_pontos',
    'data_inativacao_vale_pontos',
    'qtde_vale_pontos',
    'qtde_pontos_unitarios',
    'numero_pedido_conquista',
    'ciclo_pedido_conquista',
    'data_conquista',
    'numero_pedido_processamento',
    'ciclo_pedido_processamento',
    'ciclo_inicio',
    'ciclo_termino',
    'nome_campanha'
  ];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  public codigo_cn: number = undefined;

  constructor(
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
  user: string;
  formularioPesquisaNordeste: FormGroup;
  formularioResultPesquisaNordeste: FormGroup;


  public title: string = "Lista Vale Pontos";
  public numero_pedido: string;
  public cod_cn: string;
  public nome_cn: string;
  public data_pedido: string;
  public numero_nota_fiscal: string;
  public aumento_pto: string;
  public aumento_reais: string;
  public limite_atual: string;
  public qtde_vale_pontos: string;
  public acao: string;

  public pesquisa_efetuada: boolean = false;

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

    this.formularioPesquisaNordeste = this.formBuilder.group({
      codigo_cn:[''],
      nome_gm:[''],
      nome_re:[''],
      nome_gv:[''],
      nome_setor:[''],
      nome_completo:[''],
      situacao_vale_pontos:[''],
      qtde_pontos_unitarios:[''],
      numero_pedido_conquista:[''],
      data_conquista:[''],
      nome_campanha:['']

    })

  }

  carregar(){

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
        valorPesquisa: (this.codigo_cn !== undefined && this.codigo_cn !== null) ? this.codigo_cn.toString() : '',
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
    var texto = this.codigo_cn;
    if (texto !== undefined) {
      this.painelService.getValePontos(texto).subscribe(
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

  }

  limpar(){
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.codigo_cn = undefined;
    this.formularioPesquisaNordeste.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
