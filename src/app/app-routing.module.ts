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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AccountGuard] },
  { path: 'projeto-wave', component: ProjetoWaveComponent, canActivate: [AccountGuard] },
  { path: 'pesquisa-nordeste', component: PesquisaNordesteComponent, canActivate: [AccountGuard] },
  { path: 'plano-b-trocas', component: PlanoBTrocasComponent, canActivate: [AccountGuard] },
  { path: 'cadastros-irregulares', component: CadastrosIrregularesComponent, canActivate: [AccountGuard] },
  { path: 'pagamentos-rejeitados', component: PagamentosRejeitadosComponent, canActivate: [AccountGuard] },
  { path: 'dynamics-historico', component: DynamicsHistoricoComponent, canActivate: [AccountGuard] },
  { path: 'simulador-cobranca', component: SimuladorCobrancaComponent, canActivate: [AccountGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
