import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  let guard : Boolean = (localStorage.getItem('API_TOKEN')) ? true : false;
  const router = inject(Router);
  const service = inject(AuthService);

  if (guard) {
    service.verify().subscribe(response => {
      if (response.code != 200) {
        localStorage.removeItem('API_TOKEN');
        router.navigate(['/login']);
        guard = false;
      }
    });
  }

  return guard;
}

export const unAuthGuard = () => {
  let guard = (!localStorage.getItem('API_TOKEN')) ? true : false;
  const router = inject(Router);

  if (!guard)
    router.navigate(['/inicio']);

  return guard;
}
