import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsers } from '../../../models/Users';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page'; 

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiUrl = 'http://localhost:8090';  


  constructor(private httpClient: HttpClient) {}

  getUsers(page: number = 0, size: number = 10, email?: string, name?: string): Observable<Page<IUsers>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (email) {
      params = params.set('email', email);
    }

    if (name) {
      params = params.set('name', name);
    }

    return this.httpClient.get<Page<IUsers>>(`${this.apiUrl}/auth/superuser/listauserPaginata`, { params });
  }
}
