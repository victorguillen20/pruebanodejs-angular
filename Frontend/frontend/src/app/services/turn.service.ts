import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseTotalTurn } from '../interface/ResponseTotalTurn';
import { PeticionTurn } from '../models/PeticionTurn';
import { Turn } from '../models/Turn';
import { ResponseTurn } from '../interface/ResponseTurn';
import { GestorTurnView } from '../models/GestorTurnView';

@Injectable({
  providedIn: 'root'
})
export class TurnService {
  private http = inject(HttpClient);
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  getTotalTurns(): Observable<ResponseTotalTurn>{
    return this.http.post<ResponseTotalTurn>(`${this.baseUrl}/turn/admin/total`, {});
  }

  getTotalTurnsbyGestor(objeto: PeticionTurn): Observable<ResponseTotalTurn>{
    return this.http.post<ResponseTotalTurn>(`${this.baseUrl}/turn/total`, objeto);
  }

  generateTurn(objeto: Turn): Observable<ResponseTurn>{
    return this.http.post<ResponseTurn>(`${this.baseUrl}/turn/generate`, objeto);
  }
  getAllTurns(): Observable<GestorTurnView[]>{
    return this.http.post<GestorTurnView[]>(`${this.baseUrl}/turn/all`, {});
  }
}
