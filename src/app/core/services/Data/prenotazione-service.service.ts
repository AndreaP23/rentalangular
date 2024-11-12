import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPrenotazioni } from '../../../models/Prenotazioni';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneServiceService {

  private apiUrl = 'http://localhost:8090';  

  constructor(private http: HttpClient) {}

  getPrenotazioni(page: number = 0, size: number = 10, userId?: number, dataInizio?: string, dataFine?: string): Observable<Page<IPrenotazioni>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (userId) {
      params = params.set('userId', userId.toString());
    }
    if (dataInizio) {
      params = params.set('dataInizio', dataInizio);
    }
    if (dataFine) {
      params = params.set('dataFine', dataFine);
    }

    return this.http.get<Page<IPrenotazioni>>(`${this.apiUrl}/listprenotazioniPaginata`, { params });
  }

  // Metodo per ottenere prenotazioni di un singolo utente
  getPrenotazioniByUser(userId: number): Observable<IPrenotazioni[]> {
    return this.http.get<IPrenotazioni[]>(`${this.apiUrl}/listprenotazioni/${userId}`);
  }

  // Metodo per ottenere una prenotazione specifica per ID
  getPrenotazioneById(prenotazioneId: number): Observable<IPrenotazioni> {
    return this.http.get<IPrenotazioni>(`${this.apiUrl}/listabyprenotazione/${prenotazioneId}`);
  }

  // Metodo per salvare una prenotazione
  salvaPrenotazione(data: { userId: number, veicoloId: number, dataInizio: Date, dataFine: Date, note?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/salva`, data);
  }

  // Metodo per eliminare una prenotazione
  deletePrenotazione(prenotazioneId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/superuser/deletePrenotazione/${prenotazioneId}`);
  }

  // Metodo per modificare una prenotazione esistente
  modificaPrenotazione(prenotazioneId: number, data: { dataInizio: Date, dataFine: Date, note?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/modifica/${prenotazioneId}`, data);
  }
}
