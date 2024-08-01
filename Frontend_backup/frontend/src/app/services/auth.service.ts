import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Login } from '../models/Login';
import { ResponseLogin } from '../interface/ResponseLogin';
import { Profile } from '../models/Profile';
import { ResponseProfile } from '../interface/ResponseProfile';
import { UserlogService } from './userlog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;
  private userlogService = inject(UserlogService);

  constructor() { }

  login(objeto: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.baseUrl}/auth`, objeto).pipe(
      tap(response => {
        if (response.isValid) {
          this.userlogService.setUsername(response.username);
        }
      })
    );
  }

  profile(objeto: Profile): Observable<ResponseProfile>{
    return this.http.post<ResponseProfile>(`${this.baseUrl}/user/profile`, objeto);
  }
}
