import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthJwtService } from './services/auth-jwt.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthJwtService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const user = authService.getCurrentUser();  
  

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
    
  }

  const allowedRoles = route.data['roles'] as Array<string>; 
  
  if (user && allowedRoles.includes(user.ruolo)) {
    return true;  
  } else {
    console.warn('Ruolo non autorizzato, reindirizzamento a pagina di errore.');
    router.navigate(['/error']);
    return false;  
  }
};

