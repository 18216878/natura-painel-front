import { Component, Input, NgZone, OnInit } from '@angular/core';
import { PainelService } from '../painel.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { AccountService } from '../account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDefeitoComponent } from './local-defeito/local-defeito.component';
import { TipoDefeitoComponent } from './tipo-defeito/tipo-defeito.component';
import { ManifestacaoCorretaComponent } from './manifestacao-correta/manifestacao-correta.component';
import { DescricaoComponent } from './descricao/descricao.component';
import { SondagemDirecionadoraComponent } from './sondagem-direcionadora/sondagem-direcionadora.component';

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
  observacoes: string;
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
  id_local_defeito: number;

  tipo_defeito: string;
  id_tipo_defeito: number;

  manifestacao_correta: string;
  id_manifestacao_correta: number;

  descricao: string;
  id_descricao: number;

  sondagem: string;
  id_sondagem: number;

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
    this.id_categoria = parseInt(event.toString());
    console.log(this.id_categoria);

  }

  // Método para pesquisar Local de Defeito
  pesquisarLocalDefeito(){
    this.painelService.getNatSimuladorManifestacaoLocalDefeito(this.id_categoria).subscribe(
      data => {
        this.localDefeitoDropDown = data;
        this.abrirDialogLocalDefeito();
      }
    )
  }

  abrirDialogLocalDefeito() {
    const dialogRef = this.dialog.open(LocalDefeitoComponent, {
    data: {
      localDefeitoDropDown: this.localDefeitoDropDown
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.local_defeito = result.local_defeito;
      this.id_local_defeito = result.id_local_defeito;
    }
  });

}

// Método para pesquisar Tipo de Defeito
pesquisarTipoDefeito(){
  this.painelService.getNatSimuladorManifestacaoTipoDefeito(this.id_categoria, this.id_local_defeito).subscribe(
    data => {
      console.log(data);
      this.tipoDefeitoDropDown = data;
      this.abrirDialogTipoDefeito();
    }
  )
}

abrirDialogTipoDefeito() {
  const dialogRef = this.dialog.open(TipoDefeitoComponent, {
    data: {
      tipoDefeitoDropDown: this.tipoDefeitoDropDown
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.tipo_defeito = result.tipo_defeito;
      this.id_tipo_defeito = result.id_tipo_defeito;

      // Após selecionar o tipo de defeito, buscar as manifestações corretas
      this.painelService.getNatSimuladorManifestacaoCorreta(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
        data => {
          this.manifestacaoCorretaDropDown = data;
          this.manifestacao_correta = data[0]?.manifestacao_correta || '';
        }
      );

      // Após selecionar o tipo de defeito, buscar as descrições
      this.painelService.getNatSimuladorManifestacaoDescricao(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
        data => {
          this.descricaoDropDown = data;
          this.descricao = data[0]?.descricao || '';

        }
      );

      // Após selecionar o tipo de defeito, buscar as sondagens
      this.painelService.getNatSimuladorManifestacaoSondagem(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
        data => {
          this.sondagemDropDOwn = data;
        }
      );
    }
  });
}



// Método para pesquisar Manifestação Correta

pesquisarManifestacaoCorreta(){
  this.painelService.getNatSimuladorManifestacaoCorreta(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
    data => {
      this.manifestacaoCorretaDropDown = data;
      this.abrirDialogManifestacaoCorreta();
    }
  );
}

abrirDialogManifestacaoCorreta() {
  const dialogRef = this.dialog.open(ManifestacaoCorretaComponent, {
    data: {
      manifestacaoCorretaDropDown: this.manifestacaoCorretaDropDown
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.manifestacao_correta = result.manifestacao_correta;
      this.id_manifestacao_correta = result.id_manifestacao_correta;
    }

  });

}

// Método para pesquisar Descrição
pesquisarDescricao() {
  this.painelService.getNatSimuladorManifestacaoDescricao(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
    data => {
      this.descricaoDropDown = data;
      this.abrirDialogDescricao();
    }
  );
}

abrirDialogDescricao() {
  const dialogRef = this.dialog.open(DescricaoComponent, {
    data: {
      descricaoDropDown: this.descricaoDropDown
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.descricao = result.descricao;
      this.id_descricao = result.id_descricao;
    }
  });
}

// Método para pesquisar Sondagem
pesquisarSondagem() {
  this.painelService.getNatSimuladorManifestacaoSondagem(this.id_categoria, this.id_local_defeito, this.id_tipo_defeito).subscribe(
    data => {
      this.sondagemDropDOwn = data;
      this.abrirDialogSondagem();
    }
  );
}

abrirDialogSondagem() {
  const dialogRef = this.dialog.open(SondagemDirecionadoraComponent, {
    data: {
      sondagemDropDOwn: this.sondagemDropDOwn
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.sondagem = result.sondagem_direcionadora;
      this.id_sondagem = result.id_sondagem;
    }
  });
}








limpar() {
    this.formularioSimuladorManifestacoes.reset();
    this.localDefeitoDropDown = iLocalDefeito;
    this.tipoDefeitoDropDown = iTIpoDefeito;
    this.manifestacaoCorretaDropDown = iManifestacaoCorreta;
    this.descricaoDropDown = iDescricao;
    this.sondagemDropDOwn = iSondagem;

    this.categoria = undefined;
    this.id_categoria = undefined;
    this.local_defeito = undefined;
    this.id_local_defeito = undefined;
    this.tipo_defeito = undefined;
    this.id_tipo_defeito = undefined;
    this.manifestacao_correta = undefined;
    this.id_manifestacao_correta = undefined;
    this.descricao = undefined;
    this.id_descricao = undefined;
    this.sondagem = undefined;
    this.id_sondagem = undefined;

  }

  getTipoDefeitoFormatado(): string {
    return this.tipo_defeito ? this.tipo_defeito.replace(/\n/g, '<br>') : '';
  }
  getManifestacaoCorretaFormatada(): string {
    return this.manifestacao_correta ? this.manifestacao_correta.replace(/\n/g, '<br>') : '';
  }
  getDescricaoFormatada(): string {
    return this.descricao ? this.descricao.replace(/\n/g, '<br>') : '';
  }
  getSondagemFormatada(): string {
    return this.sondagem ? this.sondagem.replace(/\n/g, '<br>') : '';
  }
  getObservacoesFormatada(obs: string): string {
    return obs ? obs.replace(/\n/g, '<br>') : '';
  }

}
