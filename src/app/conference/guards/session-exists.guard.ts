import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ConferenceStoreService } from '../conference-store.service';

export const sessionExistsGuard: CanActivateFn = (route) => {
  const store = inject(ConferenceStoreService);
  const router = inject(Router);

  const idParam = route.paramMap.get('id');
  const id = idParam ? Number(idParam) : null;

  if (!id || isNaN(id)) {
    return router.createUrlTree(['/sessions']);
  }

  const session = store.sessions().find((s) => s.id === id);

  if (!session) {
    return router.createUrlTree(['/sessions']);
  }

  return true;
};