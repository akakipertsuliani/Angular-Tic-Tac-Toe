import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { Auth, authState } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  
  return authState(auth).pipe(
    map(user => !!user),
    tap(isUserAuth => {
      if (!isUserAuth) {
        router.navigate(['/sign-in']);
      }
    })
  )
};

export const authGuardWithOutUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(Auth);
  
  return authState(auth).pipe(
    map(user => !user),
    tap(isNotAuthenticated => {
      if (isNotAuthenticated) {
        return true;
      }
      router.navigate(['/home']);
      return false;
    })
  )
}
