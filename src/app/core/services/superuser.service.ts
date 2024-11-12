import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(private http: HttpClient) {}

  // Funzione per eliminare un utente
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8090/auth/superuser/delete/${userId}`);
  }
}