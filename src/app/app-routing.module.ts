import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjetoWaveComponent } from './projeto-wave/projeto-wave.component';
import { PesquisaNordesteComponent } from './pesquisa-nordeste/pesquisa-nordeste.component';
import { AccountGuard } from './account.guard';
import { PlanoBTrocasComponent } from './plano-b-trocas/plano-b-trocas.component';
import { CadastrosIrregularesComponent } from './cadastros-irregulares/cadastros-irregulares.component';
import { PagamentosRejeitadosComponent } from './pagamentos-rejeitados/pagamentos-rejeitados.component';
import { SimuladorCobrancaComponent } from './simulador-cobranca/simulador-cobranca.component';
import { DynamicsHistoricoComponent } from './dynamics-historico/dynamics-historico.component';
import { NaturaMainComponent } from './natura-main/natura-main.component';
import { AvonMainComponent } from './avon-main/avon-main.component';
import { ProjetoWaveAvonComponent } from './projeto-wave-avon/projeto-wave-avon.component';
import { DestaquesComponent } from './destaques/destaques.component';
import { RejeicaoPagamentoComponent } from './rejeicao-pagamento/rejeicao-pagamento.component';
import { Tag2hComponent } from './tag2h/tag2h.component';
import { SimuladorLucroDefaultComponent } from './simulador-lucro-default/simulador-lucro-default.component';
import { RegularizacaoMeiComponent } from './regularizacao-mei/regularizacao-mei.component';
import { CalculadoraTempoRelacaoComponent } from './calculadora-tempo-relacao/calculadora-tempo-relacao.component';
import { ListaGerentesNegociosComponent } from './lista-gerentes-negocios/lista-gerentes-negocios.component';
import { LideresDestaquesComponent } from './lideres-destaques/lideres-destaques.component';
import { ListaGerentesInterinasComponent } from './lista-gerentes-interinas/lista-gerentes-interinas.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { BaseAlocacaoComponent } from './base-alocacao/base-alocacao.component';
import { MigradasAvonComponent } from './migradas-avon/migradas-avon.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { LegadoMainComponent } from './legado-main/legado-main.component';
import { VtexComponent } from './vtex/vtex.component';
import { MigradasNivelComponent } from './migradas-nivel/migradas-nivel.component';
import { AtrasoEntregaComponent } from './atraso-entrega/atraso-entrega.component';
import { MovimentacaoEloComponent } from './movimentacao-elo/movimentacao-elo.component';
import { CalendarioCiclosComponent } from './calendario-ciclos/calendario-ciclos.component';
import { CalendarioRemuneracaoComponent } from './calendario-remuneracao/calendario-remuneracao.component';
import { AjusteCreditoComponent } from './ajuste-credito/ajuste-credito.component';
import { FebrabanComponent } from './febraban/febraban.component';
import { SegurancaDadosComponent } from './seguranca-dados/seguranca-dados.component';
import { RioGrandeDoSulComponent } from './rio-grande-do-sul/rio-grande-do-sul.component';
import { SimuladorLucratividadeDigitalComponent } from './simulador-lucratividade-digital/simulador-lucratividade-digital.component';
import { EmanaPayComponent } from './emana-pay/emana-pay.component';
import { PosCompraComponent } from './pos-compra/pos-compra.component';
import { CodigoVendaComponent } from './codigo-venda/codigo-venda.component';
import { SimuladorMainfestacoesComponent } from './simulador-mainfestacoes/simulador-mainfestacoes.component';
import { ErrosBoletosComponent } from './erros-boletos/erros-boletos.component';
import { TransportadoraDiasComponent } from './transportadora-dias/transportadora-dias.component';
import { ReembolsoInclusaoComponent } from './reembolso-inclusao/reembolso-inclusao.component';
import { ReparacaoComponent } from './reparacao/reparacao.component';
import { ConsultoraDistribuidoraComponent } from './consultora-distribuidora/consultora-distribuidora.component';
import { ReconhecimentoCampanhasComponent } from './reconhecimento-campanhas/reconhecimento-campanhas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AccountGuard] },
  { path: 'natura', component: NaturaMainComponent, canActivate: [AccountGuard] },
  // { path: 'avon', component: AvonMainComponent, canActivate: [AccountGuard] },
  // { path: 'legado', component: LegadoMainComponent, canActivate: [AccountGuard] },
  // { path: 'natura/projeto-wave', component: ProjetoWaveComponent, canActivate: [AccountGuard] },
  // { path: 'natura/vale-pontos', component: PesquisaNordesteComponent, canActivate: [AccountGuard] },
  { path: 'natura/plano-b-trocas', component: PlanoBTrocasComponent, canActivate: [AccountGuard] },
  // { path: 'natura/cadastros-irregulares', component: CadastrosIrregularesComponent, canActivate: [AccountGuard] },
  { path: 'natura/pagamentos-rejeitados', component: PagamentosRejeitadosComponent, canActivate: [AccountGuard] },
  { path: 'natura/dynamics-historico', component: DynamicsHistoricoComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-cobranca', component: SimuladorCobrancaComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-lucro-default', component: SimuladorLucroDefaultComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-manifestacoes', component: SimuladorMainfestacoesComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-lucratividade-digital', component: SimuladorLucratividadeDigitalComponent, canActivate: [AccountGuard] },
  // { path: 'natura/destaques', component: DestaquesComponent, canActivate: [AccountGuard] },
  { path: 'natura/reembolso-inclusao', component: ReembolsoInclusaoComponent, canActivate: [AccountGuard] },
  // { path: 'natura/erros-boletos', component: ErrosBoletosComponent, canActivate: [AccountGuard] },
  // { path: 'natura/transportadora-dias', component: TransportadoraDiasComponent, canActivate: [AccountGuard] },
  { path: 'natura/emana-pay', component: EmanaPayComponent, canActivate: [AccountGuard] },
  { path: 'natura/pos-compra', component: PosCompraComponent, canActivate: [AccountGuard] },
  { path: 'natura/codigo-venda', component: CodigoVendaComponent, canActivate: [AccountGuard] },
  // { path: 'natura/calculadora-tempo-de-relacao', component: CalculadoraTempoRelacaoComponent, canActivate: [AccountGuard] },
  { path: 'natura/lista-gerentes-de-negocio', component: ListaGerentesNegociosComponent, canActivate: [AccountGuard] },
  { path: 'natura/lista-gerentes-interinas', component: ListaGerentesInterinasComponent, canActivate: [AccountGuard] },
  // { path: 'natura/liders-destaques', component: LideresDestaquesComponent, canActivate: [AccountGuard] },
  { path: 'natura/checkout-pedido-cancelado', component: CheckoutComponent, canActivate: [AccountGuard] },
  // { path: 'natura/ajuste-credito', component: AjusteCreditoComponent, canActivate: [AccountGuard] },
  // { path: 'natura/febraban', component: FebrabanComponent, canActivate: [AccountGuard] },
  { path: 'natura/seguranca-dados', component: SegurancaDadosComponent, canActivate: [AccountGuard] },
  // { path: 'natura/migradas-avon', component: MigradasAvonComponent, canActivate: [AccountGuard] },
  // { path: 'natura/movimentacao', component: MovimentacaoComponent, canActivate: [AccountGuard] },
  { path: 'natura/reparacao', component: ReparacaoComponent, canActivate: [AccountGuard] },
  // { path: 'natura/movimentacao-elo', component: MovimentacaoEloComponent, canActivate: [AccountGuard] },
  // { path: 'natura/recovery', component: RecoveryComponent, canActivate: [AccountGuard] },
  { path: 'natura/calendario-ciclos', component: CalendarioCiclosComponent, canActivate: [AccountGuard] },
  // { path: 'natura/base-alocacao', component: BaseAlocacaoComponent, canActivate: [AccountGuard] },
  { path: 'natura/destaques', component: DestaquesComponent, canActivate: [AccountGuard] },
  // { path: 'natura/atraso-entrega', component: AtrasoEntregaComponent, canActivate: [AccountGuard] },
  { path: 'natura/calendario-remuneracao', component: CalendarioRemuneracaoComponent, canActivate: [AccountGuard] },
  // { path: 'natura/rio-grande-do-sul', component: RioGrandeDoSulComponent, canActivate: [AccountGuard] },
  // { path: 'natura/consultora-distribuidora', component: ConsultoraDistribuidoraComponent, canActivate: [AccountGuard] },
  { path: 'natura/reconhecimento-campanhas', component: ReconhecimentoCampanhasComponent, canActivate: [AccountGuard] },
  // { path: 'legado/vtex', component: VtexComponent, canActivate: [AccountGuard] },
  // { path: 'legado/migradas-nivel', component: MigradasNivelComponent, canActivate: [AccountGuard] },
  // { path: 'avon/projeto-wave', component: ProjetoWaveAvonComponent, canActivate: [AccountGuard] },
  // { path: 'avon/rejeicao-pagamento', component: RejeicaoPagamentoComponent, canActivate: [AccountGuard] },
  // { path: 'avon/tag2h', component: Tag2hComponent, canActivate: [AccountGuard] },
  // { path: 'avon/acao-regularizacao-mei', component: RegularizacaoMeiComponent, canActivate: [AccountGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
