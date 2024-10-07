import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../../../models/Users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient : HttpClient) {}

  getUsers(): Observable<IUsers[]>{
    return this.httpClient.get<IUsers[]>(`http://localhost:8090/auth/superuser/listuser`)
   }
}
