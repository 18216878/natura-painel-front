import { Component, NgZone, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  codigo_lider: number;
  nome_lider: string;
  cnpj: string;
  situacao_cadastral_cnpj: string;
  uf_endereco: string;
  aderente_meidhop: string;
  numero_ie: number;
  tipo_ie: string;
  situacao_ie: string;
  situacao_cnpj: string;
  regime: string;
  cnae: string;
  inicio_atividades: string;
  data_atualizacao_cnpj: string;
  telefone: string;
  endereco_cnpj: string;
  data_lista_opt_out: string;
  data_opt_in: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-cnpjs-irregulares',
  templateUrl: './cnpjs-irregulares.component.html',
  styleUrls: ['./cnpjs-irregulares.component.scss']
})
export class CnpjsIrregularesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'id',
    'codigo_lider',
    'nome_lider',
    'cnpj',
    'situacao_cadastral_cnpj',
    'uf_endereco',
    'aderente_meidhop',
    'numero_ie',
    'tipo_ie',
    'situacao_ie',
    'situacao_cnpj',
    'regime',
    'cnae',
    'inicio_atividades',
    'data_atualizacao_cnpj',
    'telefone',
    'endereco_cnpj',
    'data_lista_opt_out',
    'data_opt_in'
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
  formularioCnpjsIrregulares: FormGroup;
  user: string;

  public title: string = 'CNPJs Irregulares';
  public cnpj?: string = '';
  public codigo_lider?: string = '';
  public nome_lider?: string = '';

  identificadores: string[] = ['CNPJ', 'Código da Líder', 'Nome da Líder'];
  selecionado: string;

  public carregando: boolean;

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();

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

    this.formularioCnpjsIrregulares = this.formBuilder.group({
      selecionado: [''],
      cnpj: [''],
      codigo_lider: [''],
      nome_lider: ['']
    });

    this.pesquisa_efetuada = false;
    this.carregando = false;
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  private _buildTrackingAndSearch(campoPesquisa: string, valorPesquisa: string, fn: () => void) {
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
    const registrarTracking = () => {
      this.painelService.registrarWaveTracking({
        pagina: this.title,
        url: this.router.url,
        usuario: this.user,
        campoPesquisa: campoPesquisa,
        valorPesquisa: valorPesquisa,
        acao: 'Efetuou pesquisa'
      });
    };
    if (isTokenValid(accessToken)) {
      registrarTracking();
    } else if (isTokenValid(refreshToken)) {
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            registrarTracking();
          } else {
            this.router.navigate(['/login']);
          }
        },
        err => { this.router.navigate(['/login']); }
      );
    } else {
      this.router.navigate(['/login']);
    }

    this.pesquisa_efetuada = false;
    this.carregando = true;
    fn();
  }

  pesquisarCnpj() {
    this._buildTrackingAndSearch('cnpj', this.cnpj, () => {
      this.painelService.getCnpjsIrregularesPorCnpj(this.cnpj).subscribe(
        data => {
          this.dataSource = data;
          this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
          this.tableDataSource.paginator = this.paginator;
          if (this.dataSource.length === 0) {
            this._snackBar.open('Sem dados', 'Fechar');
          }
          this.carregando = false;
          this.pesquisa_efetuada = true;
        },
        err => {
          this._snackBar.open('Erro durante a pesquisa. Tente novamente', 'Fechar');
          this.carregando = false;
          this.pesquisa_efetuada = true;
        }
      );
    });
  }

  pesquisarCodigoLider() {
    this._buildTrackingAndSearch('codigo_lider', this.codigo_lider, () => {
      this.painelService.getCnpjsIrregularesPorCodigoLider(this.codigo_lider).subscribe(
        data => {
          this.dataSource = data;
          this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
          this.tableDataSource.paginator = this.paginator;
          if (this.dataSource.length === 0) {
            this._snackBar.open('Sem dados', 'Fechar');
          }
          this.carregando = false;
          this.pesquisa_efetuada = true;
        },
        err => {
          this._snackBar.open('Erro durante a pesquisa. Tente novamente', 'Fechar');
          this.carregando = false;
          this.pesquisa_efetuada = true;
        }
      );
    });
  }

  pesquisarNomeLider() {
    this._buildTrackingAndSearch('nome_lider', this.nome_lider, () => {
      this.painelService.getCnpjsIrregularesPorNomeLider(this.nome_lider).subscribe(
        data => {
          this.dataSource = data;
          this.tableDataSource = new MatTableDataSource<PeriodicElement>(data);
          this.tableDataSource.paginator = this.paginator;
          if (this.dataSource.length === 0) {
            this._snackBar.open('Sem dados', 'Fechar');
          }
          this.carregando = false;
          this.pesquisa_efetuada = true;
        },
        err => {
          this._snackBar.open('Erro durante a pesquisa. Tente novamente', 'Fechar');
          this.carregando = false;
          this.pesquisa_efetuada = true;
        }
      );
    });
  }

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioCnpjsIrregulares.reset();
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
