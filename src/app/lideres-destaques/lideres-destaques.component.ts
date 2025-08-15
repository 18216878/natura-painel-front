import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { PainelService } from '../painel.service';
import { MecanicaLideresComponent } from './mecanica-lideres/mecanica-lideres.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  codigo: number;
  nome: string;
  genero: string;
  ativas_x_cessadas: string;
  agrupamento: string;
  cd_re: number;
  nm_re: string;
  cd_gv: number;
  gv: string;
  cd_setor: number;
  setor: string;
  cd_setor_atual: number;
  nm_setor_atual: string;
  cd_gv_atual: number;
  nm_gv_atual: string;
  categorias_conquistadas: string;
  consolidado_premiacao: string;
  pontos_posicao_re: number;
  pontos_posicao_gv: number;
  pontos_posicao_setor: number;
  pontos_marco: string;
  pontos_presente: string;
  pontos_evento_sp: string;
  cpv_posicao_re: number;
  cpv_posicao_gv: number;
  cpv_posicao_setor: number;
  cpv_marco: string;
  cpv_presente: string;
  cpv_evento_sp: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-lideres-destaques',
  templateUrl: './lideres-destaques.component.html',
  styleUrls: ['./lideres-destaques.component.scss']
})
export class LideresDestaquesComponent implements OnInit {

  private registrarTracking(trackingData: any) {
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
    const callTracking = () => {
      this.painelService.registrarWaveTracking(trackingData);
    };
    if (isTokenValid(accessToken)) {
      callTracking();
    } else if (isTokenValid(refreshToken)) {
      this.painelService.refreshToken(refreshToken).subscribe(
        res => {
          if (res && res.accessToken) {
            localStorage.setItem('accessToken', res.accessToken);
            callTracking();
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

  displayedColumns: string[] = [
    'id',
    'codigo',
    'nome',
    'genero',
    'ativas_x_cessadas',
    'agrupamento',
    'cd_re',
    'nm_re',
    'cd_gv',
    'gv',
    'cd_setor',
    'setor',
    'cd_setor_atual',
    'nm_setor_atual',
    'cd_gv_atual',
    'nm_gv_atual',
    'categorias_conquistadas',
    'consolidado_premiacao',
    'pontos_posicao_re',
    'pontos_posicao_gv',
    'pontos_posicao_setor',
    'pontos_marco',
    'pontos_presente',
    'pontos_evento_sp',
    'cpv_posicao_re',
    'cpv_posicao_gv',
    'cpv_posicao_setor',
    'cpv_marco',
    'cpv_presente',
    'cpv_evento_sp'

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
  formularioDestaques: FormGroup;
  user: string;

  public title: string = "Líderes Destaques";
  public codigo?: string = "";
  public nome?: string = "";
  identificadores: string[] = ['Código', 'Nome Completo'];
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
    this.formularioDestaques = this.formBuilder.group({
      selecionado:[''],
      codigo:[''],
      nome:['']
    })
  }

  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  pesquisarCodigo() {
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
        valorPesquisa: this.codigo,
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

    var codigo = parseInt(this.codigo);
    this.pesquisa_efetuada = true;
    this.painelService.getNatDestaquesLideresCodigo(codigo).subscribe(
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

  pesquisarNome() {
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

    this.pesquisa_efetuada = true;
    this.painelService.getNatDestaquesLideresNome(this.nome).subscribe(
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

  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioDestaques.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;
    this.codigo = undefined;
    this.nome = undefined;

  }

  openDialog() {
    const dialogRef = this.dialog.open(MecanicaLideresComponent, {
      width: '80em'
    });

  }


}
