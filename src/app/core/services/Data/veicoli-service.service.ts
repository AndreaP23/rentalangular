import { Injectable } from '@angular/core';
import { IVeicoli } from '../../../models/Veicoli';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page';  // Assicurati che questo modello esista per la paginazione

@Injectable({
  providedIn: 'root'
})
export class VeicoliServiceService {

  private apiUrl = 'http://localhost:8090/listveicoli';  

  constructor(private httpClient: HttpClient) { }
  
  getVeicoli(page: number = 0, size: number = 10): Observable<Page<IVeicoli>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<Page<IVeicoli>>(this.apiUrl, { params });
  }
}
