import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserlogService } from '../services/userlog.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userlogService = inject(UserlogService);

  // Verifica si el usuario está autenticado
  const isLoggedIn = userlogService.isLoggedIn();
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
    // Redirecciona a la ruta de login
    router.navigate(['/login']);
    return false;
  }
};
