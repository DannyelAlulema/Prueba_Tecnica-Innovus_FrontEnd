import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard = () => {
  const service = inject(AuthService);
  const router = inject(Router);

  const guard = service.isAdmin();

  if (!guard)
    router.navigate(['/inicio']);

  return guard;
}
