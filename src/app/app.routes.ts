import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { VeicoliComponent } from './pages/veicoli/veicoli.component';
import { RegisterComponent } from './pages/register/register.component';
import { UtentiComponent } from './pages/utenti/utenti.component';
import { PrenotazioniComponent } from './pages/prenotazioni/prenotazioni.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './core/auth.guard';  
import { PrenotazioneVeicoloComponent } from './pages/prenotazioneveicolo/prenotazioneveicolo.component';
import { ModificaPrenotazioneComponent } from './pages/modificaprenotazione/modificaprenotazione.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard], data: { roles: ['ROLE_1', 'ROLE_2'] } },  
  { path: 'listveicoli', component: VeicoliComponent, canActivate: [authGuard], data: { roles: ['ROLE_1', 'ROLE_2'] } }, 
  { path: 'listutenti', component: UtentiComponent, canActivate: [authGuard], data: { roles: ['ROLE_1'] } }, 
  { path: 'listprenotazioni', component: PrenotazioniComponent, canActivate: [authGuard], data: { roles: ['ROLE_1', 'ROLE_2'] } }, 
  { path: 'prenotazioneveicolo/:veicoloId', component: PrenotazioneVeicoloComponent, canActivate: [authGuard], data: { roles: ['ROLE_1', 'ROLE_2'] } }, 
  { path: 'modifica-prenotazione/:prenotazioneId', component: ModificaPrenotazioneComponent, canActivate: [authGuard], data: { roles: ['ROLE_1', 'ROLE_2'] } },
  { path: '**', component: ErrorComponent },
];
