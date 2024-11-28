import { Component, NgZone, OnInit } from '@angular/core';
import { PainelService } from '../painel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ICategoria {
  id: number;
  categoria: string;
}

var iCategoria: ICategoria[];

export interface ILocalDefeito {
  id: number;
  local_defeito: string;
}

var iLocalDefeito: ILocalDefeito[];

export interface ITipoDefeito {
  id: number;
  tipo_defeito: string;
}

var iTIpoDefeito: ITipoDefeito[];

export interface IManifestacaoCorreta {
  id: number;
  manifestacao_correta: string;
}

var iManifestacaoCorreta: IManifestacaoCorreta[];

export interface IDescricao {
  id: number;
  descricao: string;
}

var iDescricao: IDescricao[];

export interface ISondagem {
  id: number;
  sondagem_direcionadora: string;
}

var iSondagem: ISondagem[];


@Component({
  selector: 'app-simulador-mainfestacoes',
  templateUrl: './simulador-mainfestacoes.component.html',
  styleUrls: ['./simulador-mainfestacoes.component.scss']
})
export class SimuladorMainfestacoesComponent implements OnInit {

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
  formularioSimuladorManifestacoes: FormGroup;
  user: string;

  categoriaDropDown = iCategoria;
  localDefeitoDropDown = iLocalDefeito;
  tipoDefeitoDropDown = iTIpoDefeito;
  manifestacaoCorretaDropDown = iManifestacaoCorreta;
  descricaoDropDown = iDescricao;
  sondagemDropDOwn = iSondagem;

  categoria: string;
  local_defeito: string;
  tipo_defeito: string;
  manifestacao_correta: string;
  descricao: string;
  sondagem: string;

  public title: string = "Simulador de Manifestações";

  ngOnInit(): void {
    this.user = this.accountService.get('user')?.toString();
      this.formularioSimuladorManifestacoes = this.formBuilder.group({
        categoria:[''],
        local_defeito:[''],
        tipo_defeito:[''],
        manifestacao_correta:[''],
        descricao:[''],
        sondagem_direcionadora:['']
      })

      this.painelService.getNatSimuladorManifestacaoCategoria().subscribe(
        data => {
          this.categoriaDropDown = data;
        }
      )

  }

  onSelect(event: Event) {
    this.painelService.getNatSimuladorManifestacaoLocalDefeito(event).subscribe(
      data => {
        this.localDefeitoDropDown = data;
      }
    )
  }

}
