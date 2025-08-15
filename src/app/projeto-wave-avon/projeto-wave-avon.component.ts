import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';

export interface PeriodicElement {
  codigo_natura: string;
  codigo_avon: string;
  cpf: number;
  nome: string;
  cep: number;
  nivel: string;
  estrutura_comercial: string;
  data_cadastro_wave2_natura: Date;
  data_cadastro_wave2_avon: Date;
  email: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-projeto-wave-avon',
  templateUrl: './projeto-wave-avon.component.html',
  styleUrls: ['./projeto-wave-avon.component.scss']
})
export class ProjetoWaveAvonComponent implements OnInit {

  displayedColumns: string[] = ['codigo_natura', 'codigo_avon', 'nome', 'cpf', 'cep', 'nivel', 'estrutura_comercial', 'data_cadastro_wave2_natura', 'data_cadastro_wave2_avon', 'email'];
  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

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
  formularioProjetoWave: FormGroup;
  user: string;

  identificadores: string[] = ['Código Natura', 'Código Avon', 'CPF'];
  selecionado: string;
  public pesquisa_efetuada: boolean = false;

  checked = false;
  public title: string = "Projeto Wave";
  public codigo_natura?: string = "";
  public codigo_avon?: string = "";
  public cpf_cn_rep?: string = "";
  public cod_natura_mailing: string;
  public cod_avon_mailing: string;
  public cpf_mailing: string;
  public nome_mailing: string;
  public cep_mailing: string;
  public nivel_mailing: string;
  public estrutura_comercial_mailing: string;
  public data_cadastro_wave2_natura_mailing: string;
  public data_cadastro_wave2_avon_mailing: string;
  public email_mailing: string;



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

      this.formularioProjetoWave = this.formBuilder.group({
        selecionado:[''],
        codigo_natura:[''],
        codigo_avon:[''],
        cpf_cn_rep:[''],
        cod_natura_mailing:[''],
        cod_avon_mailing:[''],
        nome_mailing:[''],
        cpf_mailing:[''],
        cep_mailing:[''],
        nivel_mailing:[''],
        estrutura_comercial_mailing:[''],
        data_cadastro_wave2_natura_mailing:[''],
        data_cadastro_wave2_avon_mailing:[''],
        email_mailing:['']

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
      let campoPesquisa = '';
      let valorPesquisa = '';
      if (this.selecionado === 'Código Natura') {
        campoPesquisa = 'codigo_natura';
        valorPesquisa = this.codigo_natura || '';
      } else if (this.selecionado === 'Código Avon') {
        campoPesquisa = 'codigo_avon';
        valorPesquisa = this.codigo_avon || '';
      } else if (this.selecionado === 'CPF') {
        campoPesquisa = 'cpf';
        valorPesquisa = this.cpf_cn_rep || '';
      }
      this.painelService.registrarWaveTracking({
        pagina: this.title,
        url: this.router.url,
        usuario: this.user,
        campoPesquisa,
        valorPesquisa,
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
    if (this.selecionado=='Código Natura'){
      this.painelService.getNaturaCode(this.codigo_natura).subscribe(
        data => {
          this.dataSource = data;
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
    else if (this.selecionado=='Código Avon'){
      this.painelService.getAvonCode(this.codigo_avon).subscribe(
        data => {
          this.dataSource = data;
        }
      )
    }
    else if (this.selecionado=='CPF'){
      var auxCpf = this.cpf_cn_rep.replace('.','').replace('-','');
      var cpfFormat = parseInt(auxCpf).toString();
      this.painelService.getCpf(cpfFormat).subscribe(
        data => {
          this.dataSource = data;
        }
      )
    }
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioProjetoWave.reset();
    this.selecionado = null;
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;

  }

}
