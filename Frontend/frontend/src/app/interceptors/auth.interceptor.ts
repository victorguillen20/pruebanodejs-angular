import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserlogService } from '../services/userlog.service'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userlogService: UserlogService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token del servicio
    const token = this.userlogService.getToken();

    // Si el token existe, se agrega a los headers
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    }

    // Si no hay token, solo pasar la solicitud
    return next.handle(req);
  }
}
