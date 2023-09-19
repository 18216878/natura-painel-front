import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMaskModule } from 'ngx-mask';

import { MatTabsModule } from '@angular/material/tabs'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule }  from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjetoWaveComponent } from './projeto-wave/projeto-wave.component';
import { PesquisaNordesteComponent } from './pesquisa-nordeste/pesquisa-nordeste.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormDialogComponent } from './login/login-form-dialog/login-form-dialog.component';
import { LogoutFormDialogComponent } from './home/logout-form-dialog/logout-form-dialog.component';
import { SuccessFormDialogComponent } from './projeto-wave/success-form-dialog/success-form-dialog.component';
import { StopFormDialogComponent } from './projeto-wave/stop-form-dialog/stop-form-dialog.component';
import { PlanoBTrocasComponent } from './plano-b-trocas/plano-b-trocas.component';
import { CadastrosIrregularesComponent } from './cadastros-irregulares/cadastros-irregulares.component';
import { PagamentosRejeitadosComponent } from './pagamentos-rejeitados/pagamentos-rejeitados.component';
import { CpfPipe } from './cpf.pipe';
import { CepPipe } from './cep.pipe';
import { DynamicsHistoricoComponent } from './dynamics-historico/dynamics-historico.component';
import { SimuladorCobrancaComponent } from './simulador-cobranca/simulador-cobranca.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { HttpClientModule } from '@angular/common/http';
import { SimuladorEmptyDialogComponent } from './simulador-cobranca/simulador-empty-dialog/simulador-empty-dialog.component';
import { AlcadaAcordoDiferenciadoComponent } from './simulador-cobranca/alcada-acordo-diferenciado/alcada-acordo-diferenciado.component';
import { CondicaoNegociacaoComponent } from './simulador-cobranca/condicao-negociacao/condicao-negociacao.component';
import { QuatroParcelasComponent } from './simulador-cobranca/quatro-parcelas/quatro-parcelas.component';
import { CincoParcelasComponent } from './simulador-cobranca/cinco-parcelas/cinco-parcelas.component';
import { SelecionarParcelasComponent } from './simulador-cobranca/selecionar-parcelas/selecionar-parcelas.component';
import { NaturaMainComponent } from './natura-main/natura-main.component';
import { AvonMainComponent } from './avon-main/avon-main.component';
import { ProjetoWaveAvonComponent } from './projeto-wave-avon/projeto-wave-avon.component';
import { DestaquesComponent } from './destaques/destaques.component';
import { MecanicaComponent } from './destaques/mecanica/mecanica.component';
import { RejeicaoPagamentoComponent } from './rejeicao-pagamento/rejeicao-pagamento.component';
import { Tag2hComponent } from './tag2h/tag2h.component';
import { InfoDialogComponent } from './home/info-dialog/info-dialog.component';
import { ProcessProjetoWaveComponent } from './natura-main/process/process-projeto-wave/process-projeto-wave.component';
import { ProcessValePontosComponent } from './natura-main/process/process-vale-pontos/process-vale-pontos.component';
import { ProcessPlanoBTrocasComponent } from './natura-main/process/process-plano-b-trocas/process-plano-b-trocas.component';
import { ProcessPagamentosRejeitadosComponent } from './natura-main/process/process-pagamentos-rejeitados/process-pagamentos-rejeitados.component';
import { ProcessCadastrosIrregularesComponent } from './natura-main/process/process-cadastros-irregulares/process-cadastros-irregulares.component';
import { ProcessDynamicsHistoricoComponent } from './natura-main/process/process-dynamics-historico/process-dynamics-historico.component';
import { ProcessProjetoWaveAvonComponent } from './avon-main/process/process-projeto-wave-avon/process-projeto-wave-avon.component';
import { ProcessDestaquesComponent } from './natura-main/process/process-destaques/process-destaques.component';
import { ProcessSimuladorCobrancaComponent } from './natura-main/process/process-simulador-cobranca/process-simulador-cobranca.component';
import { ProcessRejeicaoPagamentoComponent } from './avon-main/process/process-rejeicao-pagamento/process-rejeicao-pagamento.component';
import { ProcessTag2hComponent } from './avon-main/process/process-tag2h/process-tag2h.component';
import { SimuladorLucroDefaultComponent } from './simulador-lucro-default/simulador-lucro-default.component';
import { ProcessSimuladorLucroDefaultComponent } from './natura-main/process/process-simulador-lucro-default/process-simulador-lucro-default.component';
import { RegularizacaoMeiComponent } from './regularizacao-mei/regularizacao-mei.component';
import { ProcessRegularizacaoMeiComponent } from './avon-main/process/process-regularizacao-mei/process-regularizacao-mei.component';
import { CalculadoraTempoRelacaoComponent } from './calculadora-tempo-relacao/calculadora-tempo-relacao.component';
import { ProcessCalculadoraTempoRelacaoComponent } from './natura-main/process/process-calculadora-tempo-relacao/process-calculadora-tempo-relacao.component';
import { ListaGerentesNegociosComponent } from './lista-gerentes-negocios/lista-gerentes-negocios.component';
import { ListaGerentesInterinasComponent } from './lista-gerentes-interinas/lista-gerentes-interinas.component';
import { LideresDestaquesComponent } from './lideres-destaques/lideres-destaques.component';
import { ProcessLideresDestaquesComponent } from './natura-main/process/process-lideres-destaques/process-lideres-destaques.component';
import { ProcessGerentesInterinasComponent } from './natura-main/process/process-gerentes-interinas/process-gerentes-interinas.component';
import { ProcessGerentesNegociosComponent } from './natura-main/process/process-gerentes-negocios/process-gerentes-negocios.component';
import { MecanicaLideresComponent } from './lideres-destaques/mecanica-lideres/mecanica-lideres.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProcessCheckoutComponent } from './natura-main/process/process-checkout/process-checkout.component';
import { BaseAlocacaoComponent } from './base-alocacao/base-alocacao.component';
import { MigradasAvonComponent } from './migradas-avon/migradas-avon.component';
import { ProcessMigradasAvonComponent } from './natura-main/process/process-migradas-avon/process-migradas-avon.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProjetoWaveComponent,
    PesquisaNordesteComponent,
    LoginFormDialogComponent,
    LogoutFormDialogComponent,
    SuccessFormDialogComponent,
    StopFormDialogComponent,
    PlanoBTrocasComponent,
    CadastrosIrregularesComponent,
    PagamentosRejeitadosComponent,
    CpfPipe,
    CepPipe,
    DynamicsHistoricoComponent,
    SimuladorCobrancaComponent,
    SimuladorEmptyDialogComponent,
    AlcadaAcordoDiferenciadoComponent,
    CondicaoNegociacaoComponent,
    QuatroParcelasComponent,
    CincoParcelasComponent,
    SelecionarParcelasComponent,
    NaturaMainComponent,
    AvonMainComponent,
    ProjetoWaveAvonComponent,
    DestaquesComponent,
    MecanicaComponent,
    RejeicaoPagamentoComponent,
    Tag2hComponent,
    InfoDialogComponent,
    ProcessProjetoWaveComponent,
    ProcessValePontosComponent,
    ProcessPlanoBTrocasComponent,
    ProcessPagamentosRejeitadosComponent,
    ProcessCadastrosIrregularesComponent,
    ProcessDynamicsHistoricoComponent,
    ProcessProjetoWaveAvonComponent,
    ProcessDestaquesComponent,
    ProcessSimuladorCobrancaComponent,
    ProcessRejeicaoPagamentoComponent,
    ProcessTag2hComponent,
    SimuladorLucroDefaultComponent,
    ProcessSimuladorLucroDefaultComponent,
    RegularizacaoMeiComponent,
    ProcessRegularizacaoMeiComponent,
    CalculadoraTempoRelacaoComponent,
    ProcessCalculadoraTempoRelacaoComponent,
    ListaGerentesNegociosComponent,
    ListaGerentesInterinasComponent,
    LideresDestaquesComponent,
    ProcessLideresDestaquesComponent,
    ProcessGerentesInterinasComponent,
    ProcessGerentesNegociosComponent,
    MecanicaLideresComponent,
    CheckoutComponent,
    ProcessCheckoutComponent,
    BaseAlocacaoComponent,
    MigradasAvonComponent,
    ProcessMigradasAvonComponent,
    MovimentacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    MatRadioModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatExpansionModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pt-BR"
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    CpfPipe,
    CepPipe
  ]
})
export class AppModule { }
