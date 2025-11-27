import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild, Input  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { DynamicsService } from '../dynamics.service';
import { PainelService } from '../painel.service';

export interface OData {
  odatacontext: string;
  value: PeriodicElement;
}

var iOData: OData[] = [];

export interface PeriodicElement {
  ticketnumber: string;
  title: string;
  _customerid_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_naturaorder_valueODataCommunityDisplayV1FormattedValue: string;
  createdonODataCommunityDisplayV1FormattedValue: string;
  caseorigincodeODataCommunityDisplayV1FormattedValue: string;
  statuscodeODataCommunityDisplayV1FormattedValue: string;
  _nat_primarycategory_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_reason_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_secondcategory_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_solution_valueODataCommunityDisplayV1FormattedValue: string;
  _nat_solutionsecondlevel_valueODataCommunityDisplayV1FormattedValue: string;
  _ownerid_valueODataCommunityDisplayV1FormattedValue: string;
  description: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-dynamics-historico',
  templateUrl: './dynamics-historico.component.html',
  styleUrls: ['./dynamics-historico.component.scss']
})
export class DynamicsHistoricoComponent implements OnInit {

  displayedColumns: string[] = [
    'ticketnumber',
    'title',
    '_customerid_valueODataCommunityDisplayV1FormattedValue',
    '_nat_naturaorder_valueODataCommunityDisplayV1FormattedValue',
    'createdonODataCommunityDisplayV1FormattedValue',
    'caseorigincodeODataCommunityDisplayV1FormattedValue',
    'statuscodeODataCommunityDisplayV1FormattedValue',
    '_nat_primarycategory_valueODataCommunityDisplayV1FormattedValue',
    '_nat_secondcategory_valueODataCommunityDisplayV1FormattedValue',
    '_nat_reason_valueODataCommunityDisplayV1FormattedValue',
    '_nat_solution_valueODataCommunityDisplayV1FormattedValue',
    '_nat_solutionsecondlevel_valueODataCommunityDisplayV1FormattedValue',
    '_ownerid_valueODataCommunityDisplayV1FormattedValue',
    'description'
  ];

  dataSrc: any = iOData;
  dataSource: any = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();

  public pesquisa_efetuada: boolean = false;
  public token: string;

  constructor(
    private _ngZone: NgZone,
    private dynamicsService: DynamicsService,
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
  formularioDynamics: FormGroup;
  user: string;
  public carregando: Boolean = false;

  checked = false;
  public title: string = "Dynamics Histórico";
  identificadores: string[] = ['Código', 'Pedido', 'CPF'];
  selecionado: string;

  public codigo?: string = undefined;
  public pedido?: string = undefined;
  public cpf?: string = undefined;
  public client_id: string = null;

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
    this.formularioDynamics = this.formBuilder.group({
      selecionado:[''],
      codigo:[''],
      pedido:[''],
      cpf:['']
    })
  }


  pesquisarCodigo(codigo: string) {
    this.carregando = true;
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
        valorPesquisa: codigo,
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
    this.dataSrc = [];
    this.dataSource = [];

    this.dynamicsService.tokenGenerate();

    setTimeout(() =>{
      this.dynamicsService.getContactCode(codigo).subscribe(
        data => {
          this.dataSrc = data;
          if (this.dataSrc.value.length === 0) {
            var message = 'Sem dados';
            var action = 'Fechar';
            this._snackBar.open(message, action, { duration: 3000 });
            this.carregando = false;
          }
          else{
            this.client_id = this.dataSrc.value[0].contactid;
            this.dynamicsService.getDynamicsCode(this.client_id).subscribe(
              data => {
                this.dataSrc = data;
                this.dataSource = this.dataSrc.value;
                this.pesquisa_efetuada = true;
                this.carregando = false;
                console.log(data['status']);
                if (this.dataSource.length === 0) {
                  var message = 'Sem dados';
                  var action = 'Fechar'
                  this._snackBar.open(message, action, { duration: 3000 });
                  this.carregando = false;
                }
              },
              err => {
                var message = 'Erro durante a pesquisa. Tente novamente';
                var action = 'Fechar'
                this._snackBar.open(message, action, { duration: 3000 });
                this.carregando = false;
              }

              );
          }

        },
        err => {
          var message = 'Erro durante a pesquisa. Tente novamente';
          var action = 'Fechar'
          this._snackBar.open(message, action, { duration: 3000 });
          this.carregando = false;
        }
      )
    }, 2000)

  }


  pesquisarPedido(pedido: string) {

    this.carregando = true;
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
        valorPesquisa: pedido,
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

    this.dynamicsService.tokenGenerate();

    setTimeout(() => {
      this.dynamicsService.getDynamicsOrder(pedido).subscribe(
        data => {
          this.dataSrc = data;
          this.dataSource = this.dataSrc.value;
          this.carregando = false;
          this.pesquisa_efetuada = true;
        },
        (err: HttpErrorResponse) => {
          this.carregando = false;
          var message = `Erro ${err.status}: ${err.statusText}. Tente novamente`;
          var action = 'Fechar'
          this._snackBar.open(message, action, { duration: 3000 });
          this.carregando = false;
        }
      );
    }, 2000)

  }

  pesquisarCpf(cpf: string) {

    this.carregando = true;
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
        campoPesquisa: 'cpf',
        valorPesquisa: cpf,
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

    this.dynamicsService.tokenGenerate();

    setTimeout(() =>{
      this.dynamicsService.getContactDocument(cpf).subscribe(
        data => {
          this.dataSrc = data;
          this.client_id = this.dataSrc.value[0].contactid;

          this.dynamicsService.getDynamicsDocument(this.client_id).subscribe(
            data => {
              this.dataSrc = data;
              this.dataSource = this.dataSrc.value;
              this.carregando = false;
              this.pesquisa_efetuada = true;
              this.carregando = false;
            },
            (err: HttpErrorResponse) => {
              this.carregando = false;
              var message = `Erro ${err.status}: ${err.statusText}. Tente novamente`;
              var action = 'Fechar'
              this._snackBar.open(message, action, { duration: 3000 });
            }

            );

        },
        (err: HttpErrorResponse) => {
          this.carregando = false;
          var message = `Erro ${err.status}: ${err.statusText}. Tente novamente`;
          var action = 'Fechar'
          this._snackBar.open(message, action, { duration: 3000 });
        }
      )
    }, 2000)

  }

  onSelectId(event: Event) {

    var valor = event.toString();
    this.selecionado = valor;

  }


  limpar() {
    ELEMENT_DATA = [];
    this.dataSource = ELEMENT_DATA;
    this.formularioDynamics.reset();
    this.pesquisa_efetuada = false;
    this.clickedRows.clear();
  }

}
