import { Injectable } from '@angular/core';
import { IVeicoli } from '../../../models/Veicoli';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeicoliServiceService {
  /*
  private veicoli: IVeicoli[] = [
    { veicolo_id: 1, anno: 2020, disponibilita: 1, marca: 'Fiat', modello: 'Punto', targa: 'AA123BB' },
    { veicolo_id: 2, anno: 2018, disponibilita: 1, marca: 'Ford', modello: 'Focus', targa: 'BB234CC' },
    { veicolo_id: 3, anno: 2021, disponibilita: 0, marca: 'Toyota', modello: 'Yaris', targa: 'CC345DD' },
    { veicolo_id: 4, anno: 2019, disponibilita: 0, marca: 'BMW', modello: 'Serie 3', targa: 'DD456EE' },
    { veicolo_id: 5, anno: 2022, disponibilita: 0, marca: 'Mercedes', modello: 'Classe A', targa: 'EE567FF' }
  ]; */

  constructor(private httpClient : HttpClient) { }
  
  getVeicoli(): Observable<IVeicoli[]> { 
    return this.httpClient.get<IVeicoli[]>(`http://localhost:8090/customer/listveicoli`)
  }

}
