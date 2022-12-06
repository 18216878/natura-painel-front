import { Md5 } from 'ts-md5';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoginFormDialogComponent } from './login-form-dialog/login-form-dialog.component';
import { PainelService } from '../painel.service';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

export interface PeriodicElement {
  id: number;
  user: string;
  name: string;
  password: string;
}


var ELEMENT_DATA: PeriodicElement[] = [];

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

  private storage: Storage;

  router: Router;
  constructor(
    public dialog: MatDialog,
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    router: Router,
    private accountService: AccountService
    ) {
      this.router = router;
      this.storage = window.localStorage;
    }

  ngOnInit(): void {
    this.accountService.clear();


    this.formulario = this.formBuilder.group({
      user:['', Validators.required],
      senha: ['', Validators.required]
    })

  }

  logon(senha : string, user: string) {

    var encrypt = Md5.hashStr(senha);   

    if (user.length > 0) {      
      this.painelService.getUser(user).subscribe(
        data => {
          this.dataSource = data;
          if(this.dataSource.length == 0){
            this.openDialog();
          }
          else if(this.dataSource[0].password == encrypt){
            this.accountService.set('user', user);
            this.accountService.set('id', this.dataSource[0].id.toString());
            var logado = this.isLoggedIn();
            if (logado == true) {
              this.router.navigate(['../home'])
            }
          }
          else {
            this.openDialog();
          }

        }
      )
          
    }
    else if (user.length == 0 || senha.length == 0) {
      this.openDialog();
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
