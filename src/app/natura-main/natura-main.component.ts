import { Component, OnInit } from '@angular/core';
import { faCircleInfo, faCircleExclamation, faTruckFast, faCity, faCartPlus, faMagnifyingGlass, faLocationDot, faBottleDroplet , faSackDollar, faAddressCard, faFingerprint, faUserPen, faTag, faBarcode, faGift } from '@fortawesome/free-solid-svg-icons';
import { faFaceAngry, faFaceSmile, faFaceFrown, faEnvelope, faThumbsDown, faThumbsUp, faMoneyBill1, faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram, faTwitter, faShopify } from '@fortawesome/free-brands-svg-icons';
import { PainelService } from '../painel.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { InfoDialogComponent } from '../home/info-dialog/info-dialog.component';
import { ProcessProjetoWaveComponent } from './process/process-projeto-wave/process-projeto-wave.component';
import { ProcessValePontosComponent } from './process/process-vale-pontos/process-vale-pontos.component';
import { ProcessPlanoBTrocasComponent } from './process/process-plano-b-trocas/process-plano-b-trocas.component';
import { ProcessPagamentosRejeitadosComponent } from './process/process-pagamentos-rejeitados/process-pagamentos-rejeitados.component';
import { ProcessCadastrosIrregularesComponent } from './process/process-cadastros-irregulares/process-cadastros-irregulares.component';
import { ProcessDynamicsHistoricoComponent } from './process/process-dynamics-historico/process-dynamics-historico.component';
import { ProcessDestaquesComponent } from './process/process-destaques/process-destaques.component';
import { ProcessSimuladorCobrancaComponent } from './process/process-simulador-cobranca/process-simulador-cobranca.component';
import { ProcessSimuladorLucroDefaultComponent } from './process/process-simulador-lucro-default/process-simulador-lucro-default.component';
import { ProcessCalculadoraTempoRelacaoComponent } from './process/process-calculadora-tempo-relacao/process-calculadora-tempo-relacao.component';
import { ProcessGerentesNegociosComponent } from './process/process-gerentes-negocios/process-gerentes-negocios.component';
import { ProcessGerentesInterinasComponent } from './process/process-gerentes-interinas/process-gerentes-interinas.component';
import { ProcessLideresDestaquesComponent } from './process/process-lideres-destaques/process-lideres-destaques.component';


@Component({
  selector: 'app-natura-main',
  templateUrl: './natura-main.component.html',
  styleUrls: ['./natura-main.component.scss']
})
export class NaturaMainComponent implements OnInit {

  constructor(
    private painelService: PainelService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    router: Router,
    private accountService: AccountService
    ) { 
      this.router = router;
      this.storage = window.localStorage;
      window.scroll(0, 0);
    }
    router: Router;
    private storage: Storage;
    public user: string;
    public user_id: string;

  faTruckFast = faTruckFast;
  faCity = faCity;
  faCartPlus = faCartPlus;
  faLocationDot = faLocationDot;
  faMagnifyingGlass = faMagnifyingGlass;
  faBottleDroplet = faBottleDroplet;
  faCircleExclamation = faCircleExclamation;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFaceAngry = faFaceAngry;
  faFaceSmile = faFaceSmile;
  faFaceFrown = faFaceFrown;
  faEnvelope = faEnvelope;
  faThumbsDown = faThumbsDown;
  faThumbsUp = faThumbsUp;
  faShopify = faShopify;
  faSackDollar = faSackDollar;
  faMoneyBill1 = faMoneyBill1;
  faCreditCard = faCreditCard;
  faAddressCard = faAddressCard;
  faFingerprint = faFingerprint;
  faUserPen = faUserPen;
  faTag = faTag;
  faBarcode = faBarcode;
  faGift = faGift;
  faCircleInfo = faCircleInfo;

  ngOnInit(): void {

    this.user = this.accountService.get('user')?.toString();
    
  }

  openInfoDialog() {
    const dialogRef = this.dialog.open(InfoDialogComponent);

  }

  openProjetoWaveDialog(){
    const dialogRef = this.dialog.open(ProcessProjetoWaveComponent);
  }

  openValePontosDialog() {
    const dialogRef = this.dialog.open(ProcessValePontosComponent);
  }

  openPlanosBeTrocasDialog() {
    const dialogRef = this.dialog.open(ProcessPlanoBTrocasComponent);
  }

  openCadastrosIrregularesDialog() {
    const dialogRef = this.dialog.open(ProcessCadastrosIrregularesComponent);
  }

  openPagamentosRejeitadosDialog() {
    const dialogRef = this.dialog.open(ProcessPagamentosRejeitadosComponent);
  }

  openDynamicsHistoricoDialog() {
    const dialogRef = this.dialog.open(ProcessDynamicsHistoricoComponent);
  }

  openSimuladorCobrancaDialog() {
    const dialogRef = this.dialog.open(ProcessSimuladorCobrancaComponent);
  }

  openSimuladorLucroDefaultDialog() {
    const dialogRef = this.dialog.open(ProcessSimuladorLucroDefaultComponent);
  }

  openDestaquesDialog() {
    const dialogRef = this.dialog.open(ProcessDestaquesComponent);
  }
  
  openCalculadoraTempoDeRelacaoDialog() {
    const dialogRef = this.dialog.open(ProcessCalculadoraTempoRelacaoComponent);
  }

  openListaGerentesNegocios() {
    const dialogRef = this.dialog.open(ProcessGerentesNegociosComponent);
  }

  openListaGerentesInterinas() {
    const dialogRef = this.dialog.open(ProcessGerentesInterinasComponent);
  }

  openLideresDestaques() {
    const dialogRef = this.dialog.open(ProcessLideresDestaquesComponent);
  }
  

}
