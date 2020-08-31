import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { Dragon } from '../models/dragon';

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  constructor(public http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(`${environment.baseUrl}dragon`);
  }

  getId(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}dragon/${id}`);
  }

  post(body: Dragon): Observable<any> {
    return this.http.post(`${environment.baseUrl}dragon`, body);
  }

  put(body: Dragon, id: string): Observable<any> {
    return this.http.put(`${environment.baseUrl}dragon/${id}`, body);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}dragon/${id}`);
  }
}
