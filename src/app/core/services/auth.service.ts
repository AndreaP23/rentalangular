import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IUsers } from '../../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Invio richiesta al backend
  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    // Log delle credenziali inviate
    console.log('Invio richiesta di login con:', body); 

    return this.http.post<any>(`http://localhost:8090/auth/login`, body, { headers }).pipe(
      map((response) => {
        // Log della risposta del server
        console.log('Risposta del server:', response); 

        if (response && response.user) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.user));
          return response; 
        }
        
        console.warn('Login fallito: nessun utente trovato nella risposta');
        throw new Error("Login fallito"); 
      }),
      catchError((error) => {
        console.error('Errore durante la richiesta di login:', error); 
        return [false]; 
      })
    );
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false; 
  }

  register(data: { nome: string, cognome: string, email: string, password: string, telefono: string, dataNascita: Date }) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`http://localhost:8090/auth/register`, data, { headers }).pipe(
      map((response) => {
        console.log('Registrazione avvenuta con successo', response);
        return response;
      }),
      catchError((error) => {
        console.error('Errore durante la registrazione', error);
        return throwError(error);
      })
    );
  }
  
  
  // Rimuovo dal LocalStorage i dati per effettuare il Logout
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    console.log('Utente disconnesso'); 
  }

  //Questo metodo mi permette di verificare (tramite typeof) se l'applicazione è in esecuzione su un Browers
  //Verifica che ci sia un LocalStorage
  getCurrentUser(): any {
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null; //Parsing
    }
    return null; 
  }
  
  
}
