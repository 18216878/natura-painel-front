import { Md5 } from 'ts-md5';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormDialogComponent } from './login-form-dialog/login-form-dialog.component';
import { PainelService } from '../painel.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../account.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';

export interface PeriodicElement {
  id: number;
  user: string;
  name: string;
  password: string;
}

var ELEMENT_DATA: PeriodicElement[] = [];

export interface IAcessos {
  user: number;
  access_date: string;
}

var iAcessos: IAcessos[] = [];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  displayedColumns: string[] = ['id', 'user', 'name', 'password'];
  dataSource = ELEMENT_DATA;

  public formulario: FormGroup;
  public senha: string = '';
  public user: string;
  public carregando: Boolean;

  private storage: Storage;

  router: Router;
  constructor(
    public dialog: MatDialog,
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    router: Router,
    private _snackBar: MatSnackBar,
    private accountService: AccountService
    ) {
      this.router = router;
      this.storage = window.localStorage;
    }

  ngOnInit(): void {
    this.accountService.clear();
    this.carregando = false;


    this.formulario = this.formBuilder.group({
      user:['', Validators.required],
      senha: ['', Validators.required]
    })

  }

  // logon(senha : string, user: string) {

  //   this.carregando = true;
  //   var encrypt = Md5.hashStr(senha);

  //   if (user.length > 0) {
  //     this.painelService.getUser(user).subscribe(
  //       data => {
  //         this.dataSource = data;
  //         if(this.dataSource.length == 0){
  //           this.openDialog();
  //           this.carregando = false;
  //         }
  //         else if(this.dataSource[0].password == encrypt){
  //           this.accountService.set('user', user);
  //           this.accountService.set('id', this.dataSource[0].id.toString());
  //           var logado = this.isLoggedIn();


  //           var usuario = parseInt(this.accountService.get('user'));
  //           var dataAcesso = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  //           iAcessos = [{
  //             user: usuario,
  //             access_date: dataAcesso
  //           }]

  //           var jsonString = JSON.stringify(iAcessos);
  //           jsonString = jsonString.replace('[','').replace(']','');
  //           var json: JSON = JSON.parse(jsonString);
  //           this.painelService.postAcessos(json);
  //           this.carregando = false;

  //           if (logado == true) {
  //             this.carregando = false;
  //             this.router.navigate(['../home'])
  //           }
  //         }
  //         else {
  //           this.openDialog();
  //           this.carregando = false;
  //         }

  //       },
  //       err => {
  //         var message = 'Erro durante a pesquisa. Tente novamente';
  //         var action = 'Fechar'
  //         this._snackBar.open(message, action);
  //         this.carregando = false;
  //       }
  //     )

  //   }
  //   else if (user.length == 0 || senha.length == 0) {
  //     this.openDialog();
  //     this.carregando = false;
  //   }


  // }

  logon(senha: string, user: string) {
    this.carregando = true;
    const encrypt = Md5.hashStr(senha);

    if (user.length > 0 && senha.length > 0) {
      this.painelService.login(user, encrypt).subscribe(
        tokens => {
          // Salva os tokens no LocalStorage
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          // Decodifica o id do usuário do accessToken
          let usuarioId = user;
          try {
            const payload = tokens.accessToken.split('.')[1];
            let base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) base64 += '=';
            const decoded = JSON.parse(atob(base64));
            if (decoded && decoded.id) {
              usuarioId = decoded.id;
              let usuario: number = decoded.user || user;
              localStorage.setItem('id', decoded.id.toString());

              // Registra o acesso no backend (agora só envia o user)
              this.painelService.postAcessos({
                  user: usuario
              }, tokens.accessToken);
            }

          } catch {}
          // Salva dados do usuário se necessário
          this.accountService.set('user', user);

          // Redireciona para home
          this.carregando = false;
          this.router.navigate(['../home']);
        },
        err => {
          this.openDialog();
          this.carregando = false;
        }
      );
    } else {
      this.openDialog();
      this.carregando = false;
    }
  }

  public refreshUserToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.painelService.refreshToken(refreshToken).subscribe(
        tokens => {
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
        },
        err => {
          this.openDialog();
        }
      );
    }
  }

  isLoggedIn() {
    if (this.storage.getItem('user') == this.user) {
      return true;
    }
    else{
      return false;
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginFormDialogComponent, {
      width: '35em'
    });

  }

}
