import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable, ObservableLike } from 'rxjs';
import { GetidbyUser } from '../models/GetidbyUser';
import { ResponseGetidbyUser } from '../interface/ResponseGetidbyUser';
import { GetUserUnaproval } from '../models/GetUserUnaproval';
import { ResponseGetUserUnaproval } from '../interface/ResponseGetUserUnaproval';
import { RegisterRegularUser } from '../models/RegisterRegularUser';
import { ResponseRegularUser } from '../interface/ResponseRegularUser';
import { User } from '../models/User';
import { ResponseUser } from '../interface/ResponseUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  getId(objeto: GetidbyUser): Observable<ResponseGetidbyUser>{
    return this.http.post<ResponseGetidbyUser>(`${this.baseUrl}/user/getid`, objeto);
  }

  getUsersUaproval(objeto: GetUserUnaproval): Observable<ResponseGetUserUnaproval[]>{
    return this.http.post<ResponseGetUserUnaproval[]>(`${this.baseUrl}/user/unaproval`, objeto);
  }

  registerUser(objeto: RegisterRegularUser): Observable<ResponseRegularUser>{
    return this.http.post<ResponseRegularUser>(`${this.baseUrl}/user/register`, objeto);
  }

  userAndEmailExist(objeto: User): Observable<ResponseUser>{
    return this.http.post<ResponseUser>(`${this.baseUrl}/user/useremailexist`, objeto);
  }

  updatePassword(objeto: User): Observable<ResponseUser>{
    return this.http.post<ResponseUser>(`${this.baseUrl}/user/recover`, objeto);
  }

}
