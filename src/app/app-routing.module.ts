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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AccountGuard] },
  { path: 'natura', component: NaturaMainComponent, canActivate: [AccountGuard] },
  { path: 'avon', component: AvonMainComponent, canActivate: [AccountGuard] },
  { path: 'natura/projeto-wave', component: ProjetoWaveComponent, canActivate: [AccountGuard] },
  { path: 'natura/vale-pontos', component: PesquisaNordesteComponent, canActivate: [AccountGuard] },
  { path: 'natura/plano-b-trocas', component: PlanoBTrocasComponent, canActivate: [AccountGuard] },
  { path: 'natura/cadastros-irregulares', component: CadastrosIrregularesComponent, canActivate: [AccountGuard] },
  { path: 'natura/pagamentos-rejeitados', component: PagamentosRejeitadosComponent, canActivate: [AccountGuard] },
  { path: 'natura/dynamics-historico', component: DynamicsHistoricoComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-cobranca', component: SimuladorCobrancaComponent, canActivate: [AccountGuard] },
  { path: 'natura/simulador-lucro-default', component: SimuladorLucroDefaultComponent, canActivate: [AccountGuard] },
  { path: 'natura/destaques', component: DestaquesComponent, canActivate: [AccountGuard] },
  { path: 'avon/projeto-wave', component: ProjetoWaveAvonComponent, canActivate: [AccountGuard] },
  { path: 'avon/rejeicao-pagamento', component: RejeicaoPagamentoComponent, canActivate: [AccountGuard] },
  { path: 'avon/tag2h', component: Tag2hComponent, canActivate: [AccountGuard] },
  { path: 'avon/acao-regularizacao-mei', component: RegularizacaoMeiComponent, canActivate: [AccountGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
