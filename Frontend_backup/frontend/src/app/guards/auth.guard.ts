import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserlogService } from '../services/userlog.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userlogService = inject(UserlogService);

  // Verifica si el usuario está autenticado
  const isLoggedIn = userlogService.isLoggedIn();

  if (isLoggedIn) {
    return true;
  } else {
    return false; // Redirecciona a la ruta de login
  }
};
