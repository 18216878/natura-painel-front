import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/account.service';
import { PainelService } from 'src/app/painel.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-reembolso-autenticacao',
  templateUrl: './reembolso-autenticacao.component.html',
  styleUrls: ['./reembolso-autenticacao.component.scss']
})
export class ReembolsoAutenticacaoComponent implements OnInit {

  public senha: string;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
  }

  autenticar(senha: string) {

    if(senha === undefined || senha === ''){
      var message = 'Informe a senha';
      var action = 'Fechar'
      this._snackBar.open(message
        , action);

    }

    else {
      var encrypt = Md5.hashStr(senha);
      this.painelService.getObterSenha().subscribe(
        data => {

          if (data[0].pass === encrypt) {
            this.accountService.set('autenticado', 'sim');
            this.dialog.closeAll();
          } else {
            var message = '🚫 Senha incorreta';
            var action = 'Fechar'
            this._snackBar.open(message, action);
            this.senha = undefined;
          }
        },
        err => {
          var message = 'Erro durante a pesquisa. Tente novamente';
          var action = 'Fechar'
          this._snackBar.open(message, action);
        }
      )
    }

    this.accountService.set('autenticado', 'sim');

  }

}
