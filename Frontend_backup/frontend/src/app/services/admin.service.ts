import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { AdminUserRegister } from '../models/AdminUserRegister';
import { ResponseAdminUserRegister } from '../interface/ResponseAdminUserRegister';
import { UserAproved } from '../models/UserAproved';
import { ResponseMarcadores } from '../interface/ResponseMarcadores';
import { ResponseCaja } from '../interface/ResponseCaja';
import { ResponseAdminGetProfile } from '../interface/ResponseAdminGetProfile';
import { AdminUpdateUser } from '../models/AdminUpdateUsers';
import { ResponseAdminUpdateUser } from '../interface/ResponseAdminUpdateUser';
import { UnapprovedUser } from '../models/UnapprovedUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  constructor() { }
  userRegister(objeto: AdminUserRegister): Observable<ResponseAdminUserRegister>{
    return this.http.post<ResponseAdminUserRegister>(`${this.baseUrl}/admin/register`, objeto);
  }
  userAproved(objeto: UserAproved): Observable<ResponseAdminUserRegister>{
    return this.http.post<ResponseAdminUserRegister>(`${this.baseUrl}/admin/aprove`, objeto);
  }

  getMarcadores(): Observable<ResponseMarcadores>{
    return this.http.post<ResponseMarcadores>(`${this.baseUrl}/admin/marcadores`, {});
  }

  getCash(): Observable<ResponseCaja>{
    return this.http.post<ResponseCaja>(`${this.baseUrl}/admin/cash`, {});
  }

  getProfile(): Observable<ResponseAdminGetProfile>{
    return this.http.post<ResponseAdminGetProfile>(`${this.baseUrl}/admin/profiles`, {});
  }

  updateProfile(objeto: AdminUpdateUser): Observable<ResponseAdminUpdateUser>{
    return this.http.post<ResponseAdminUpdateUser>(`${this.baseUrl}/admin/update`, objeto);
  }

  getUnapprovedUser(): Observable<UnapprovedUser[]>{
    return this.http.post<UnapprovedUser[]>(`${this.baseUrl}/admin/usersforapproval`, {});
  }
}
