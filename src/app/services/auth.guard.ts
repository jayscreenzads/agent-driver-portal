import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  let isLoggedIn = localStorage.getItem('accessToken');
  if (isLoggedIn !== null) {
    return true;
  } else {
    toastr.error('Access denied. Redirecting to login page.');
    router.navigateByUrl('/login');
    return false;
  }
};
