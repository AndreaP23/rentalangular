import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './pages/error/error.component';
import { VeicoliComponent } from './pages/veicoli/veicoli.component';
import { RegisterComponent } from './pages/register/register.component';
import { UtentiComponent } from './pages/utenti/utenti.component';
import { PrenotazioniComponent } from './pages/prenotazioni/prenotazioni.component';
import { PrenotazioneveicoloComponent } from './pages/prenotazioneveicolo/prenotazioneveicolo.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent},
  { path: 'welcome/:userid', component: WelcomeComponent },
  { path: 'listveicoli', component: VeicoliComponent},
  { path : 'register', component: RegisterComponent},
  { path :'listutenti', component: UtentiComponent },
  { path : 'listprenotazioni', component: PrenotazioniComponent },
  { path : 'prenotazioneveicolo', component: PrenotazioneveicoloComponent },
  { path: '**', component: ErrorComponent },
];
