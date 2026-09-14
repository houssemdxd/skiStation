import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROLE_NAME } from '../constants/labels';
import { UserRole } from '../models/api.models';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route) => {
  const session = inject(SessionService);
  const router = inject(Router);
  const role = route.data['role'] as UserRole | undefined;
  if (role === 'skieur' || role === 'moniteur' || role === 'admin') {
    if (!session.loggedIn() || session.role() !== role) {
      session.login(role, session.displayName() || ROLE_NAME[role]);
    }
    return true;
  }
  return router.createUrlTree(['/login']);
};
