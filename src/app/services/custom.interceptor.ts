import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.development';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const userSrv = inject(UserService);
  const toastr = inject(ToastrService);

  let parsedAccessToken: any = null;
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) {
    parsedAccessToken = JSON.parse(accessToken);
  }

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${parsedAccessToken}`,
      ContentType: 'application/json',
    },
  });

  // refresh token fx
  return next(cloneRequest).pipe(
    catchError((error: any) => {
      console.log('http interceptor cloneRequest.pipe: ', error.error.error);

      if (error.error.errorCode === 1006 && error.status === 422) {
        console.log(
          'error.errorCode === 1006 && error.status === 422: ',
          error.error.error
        );
        toastr.error(error.error.error);
      }

      // expired token
      if (error.status === 401 && parsedAccessToken !== null) {
        const isRefresh = confirm(
          'Your session is expired. Do you want to Continue?'
        );

        if (isRefresh) {
          userSrv.$refreshToken.next(true);
        }
      }

      // unauthenticated
      if (error.status === 401 && parsedAccessToken === null) {
        console.log('error.status === 400: ', error.error);
        toastr.error(`${error.error.error}`);
      }

      if (error.status === 500) {
        console.log('error.status === 500: ', error.error);
        toastr.error(`${error.error.error}`);
      }
      throw new Error('error');
    })
  );

  // // if no refresh token fx uncomment this
  // return next(cloneRequest);
};
