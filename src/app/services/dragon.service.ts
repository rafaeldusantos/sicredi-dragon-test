import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Dragon } from '../models/dragon';

@Injectable({
  providedIn: 'root'
})
export class DragonService {

  constructor(public http: HttpClient) { }

  get(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.baseUrl}dragon`).subscribe(
        (data: any) => {
          resolve(data);
        },(error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  getId(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.baseUrl}dragon/${id}`).subscribe(
        (data: any) => {
          resolve(data);
        },(error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  post(body: Dragon): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.baseUrl}dragon`, body).subscribe(
        (data: any) => {
          resolve(data);
        },(error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  put(body: Dragon, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(`${environment.baseUrl}dragon/${id}`, body).subscribe(
        (data: any) => {
          resolve(data);
        },(error) => {
          console.error(error);
          reject(error);
        });
    });
  }
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(`${environment.baseUrl}dragon/${id}`).subscribe(
        (data: any) => {
          resolve(data);
        },(error) => {
          console.error(error);
          reject(error);
        });
    });
  }
}
