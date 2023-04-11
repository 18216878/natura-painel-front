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

  logon(senha : string, user: string) {

    this.carregando = true;
    var encrypt = Md5.hashStr(senha);   
    
    if (user.length > 0) {      
      this.painelService.getUser(user).subscribe(
        data => {
          this.dataSource = data;
          if(this.dataSource.length == 0){
            this.openDialog();
            this.carregando = false;
          }
          else if(this.dataSource[0].password == encrypt){
            this.accountService.set('user', user);
            this.accountService.set('id', this.dataSource[0].id.toString());
            var logado = this.isLoggedIn();
            

            var usuario = parseInt(this.accountService.get('user'));
            var dataAcesso = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

            iAcessos = [{
              user: usuario,
              access_date: dataAcesso
            }]

            var jsonString = JSON.stringify(iAcessos);
            jsonString = jsonString.replace('[','').replace(']','');
            var json: JSON = JSON.parse(jsonString);
            this.painelService.postAcessos(json);
            this.carregando = false;

            if (logado == true) {
              this.carregando = false;
              this.router.navigate(['../home'])
            }
          }
          else {
            this.openDialog();
            this.carregando = false;
          }

        },
        err => {
          var message = 'Erro durante a pesquisa. Tente novamente';     
          var action = 'Fechar'     
          this._snackBar.open(message, action);
          this.carregando = false;
        }
      )
          
    }
    else if (user.length == 0 || senha.length == 0) {
      this.openDialog();
      this.carregando = false;
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
