import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { HttpClientModule } from '@angular/common/http';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DetalhesComponent } from './detalhes/detalhes.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { LocalStorageService } from './local-storage.service';
import { LoginService } from './login.service';
import { CardapioService } from './cardapio.service';
import { MerendeiraComponent } from './merendeira/merendeira.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditarPratoComponent } from './editar-prato/editar-prato.component';
import { DatePipe } from '@angular/common';
import { PratoService } from './prato.service';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'detalhes', component: DetalhesComponent },
      { path: 'cardapio', component: CardapioComponent },
      { path: 'merendeira', component: MerendeiraComponent },
      { path: 'editar-prato', component: EditarPratoComponent }
    ])
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    UsuarioComponent,
    CadastroComponent,
    DetalhesComponent,
    CardapioComponent,
    MerendeiraComponent,
    NavbarComponent,
    EditarPratoComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    LocalStorageService,
    LoginService,
    CardapioService,
    DatePipe,
    PratoService
  ]
})
export class AppModule {}
