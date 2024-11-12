import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../../models/Token';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthJwtService {

  server: string = environment.server;
  port: string = environment.port;

  constructor(private httpClient: HttpClient) {}

  // Metodo di autenticazione
  autenticateService(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.httpClient.post<Token>(`${environment.authServerUri}`, body, { headers }).pipe(
      map(data => {
        if (data && data.token) {
          this.setSession(data.token);
          return { token: data.token, decoded: jwtDecode(data.token) };
        }
        throw new Error('Token non ricevuto!');
      })
    );
  }

  // Imposta il token in sessione e salva l'utente decodificato
  private setSession(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem("AuthToken", token);  
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem("Utente", JSON.stringify(decodedToken));
    }
  }

  // Verifica se l'utente è loggato
  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && !!sessionStorage.getItem('AuthToken');
  }

  // Ottieni i dati dell'utente corrente dal token decodificato
  getCurrentUser(): any {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const user = sessionStorage.getItem('Utente');
      return user ? JSON.parse(user) : null;  
    }
    return null;
  }

  // Logout dell'utente
  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('AuthToken');
      sessionStorage.removeItem('Utente');
      console.log('Utente disconnesso');
    }
  }

  // Richiedi un nuovo token usando il refresh token
  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${environment.authServerUri}/refresh`, {}, { headers }).pipe(
      map(response => {
        const newToken = response.token;
        if (newToken) {
          this.setSession(newToken); // Aggiorna sessione con il nuovo token
        }
        return newToken;
      }),
      catchError(error => {
        this.logout();  // Disconnetti l'utente se il refresh fallisce
        return throwError('Sessione scaduta. Effettua di nuovo il login.');
      })
    );
  }
}
