import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { ResponseClient } from '../interface/ResponseClient';
import { Contract } from '../models/Contract';
import { ResponseContract } from '../interface/ResponseContract';
import { UpdateContract } from '../models/UpdateContract';
import { ResponseUpdateContract } from '../interface/ResponseUpdateContract';
import { ResponseClientUpdate } from '../interface/ResponseUpdateClient';
import { ResponseViewContracts } from '../interface/ResponseViewContracts';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() { }
  registerClient(objeto: Client): Observable<ResponseClient>{
    return this.http.post<ResponseClient>(`${this.baseUrl}/client/register`, objeto);
  }
  registerContract(objeto: Contract): Observable<ResponseContract>{
    return this.http.post<ResponseContract>(`${this.baseUrl}/client/contract/register`, objeto);
  }
  // updateContract(objeto: UpdateContract): Observable<ResponseUpdateContract>{
  //   return this.http.post<ResponseUpdateContract>(`${this.baseUrl}/client/contract/update`, objeto);
  // }
  getAllClients(): Observable<Client[]> {
    return this.http.post<Client[]>(`${this.baseUrl}/client/allprofiles`,{});
  }
  updateClient(objeto: Client): Observable<ResponseClientUpdate>{
    return this.http.post<ResponseClientUpdate>(`${this.baseUrl}/client/update`,objeto);
  }
  getContracts(): Observable<ResponseViewContracts[]>{
    return this.http.post<ResponseViewContracts[]>(`${this.baseUrl}/client/contract/allcontracts`, {})
  }
}
