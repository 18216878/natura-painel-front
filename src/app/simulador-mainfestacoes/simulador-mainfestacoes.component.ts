import { Component, Input, NgZone, OnInit } from '@angular/core';
import { PainelService } from '../painel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDefeitoComponent } from './local-defeito/local-defeito.component';

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
  @Input() localDefeitoDropDown = iLocalDefeito;
  @Input() tipoDefeitoDropDown = iTIpoDefeito;
  @Input() manifestacaoCorretaDropDown = iManifestacaoCorreta;
  @Input() descricaoDropDown = iDescricao;
  @Input() sondagemDropDOwn = iSondagem;

  categoria: string;
  id_categoria: number;
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
    this.id_categoria = parseInt((event.target as HTMLSelectElement).value);

  }

  pesquisarLocalDefeito(){
    this.painelService.getNatSimuladorManifestacaoLocalDefeito(this.id_categoria).subscribe(
      data => {
        this.localDefeitoDropDown = data;
        this.selectedLocalDefeitoIndex = null; // Reset the selected index when a new local_defeito is searched
        this.abrirDialogLocalDefeito();
      }
    )

  }

  selectedLocalDefeitoIndex: number | null = null;

onToggleLocalDefeito(index: number) {
  this.selectedLocalDefeitoIndex = index;
}

abrirDialogLocalDefeito() {
  const dialogRef = this.dialog.open(LocalDefeitoComponent, {
    data: {
      localDefeitoDropDown: this.localDefeitoDropDown
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.local_defeito = result;
    }
  });
}

}
