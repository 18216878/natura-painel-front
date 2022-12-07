import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxMaskModule } from 'ngx-mask'

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
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    CepPipe
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
    MatTabsModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    CpfPipe,
    CepPipe
  ]
})
export class AppModule { }
