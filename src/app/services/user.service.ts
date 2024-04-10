import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public $refreshToken = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.getRefreshToken();
    });
  }

  onLogin(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/auth/login`, obj);
  }

  onRegister(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/auth/signup`, obj);
  }

  onForgot(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/auth/forgot`, obj);
  }

  onReset(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/auth/reset`, obj);
  }

  getRefreshToken() {
    let loggedUserData: any = {};
    const userData = localStorage.getItem('user');
    if (userData !== null) {
      loggedUserData = JSON.parse(userData);
    }

    const obj = {
      email: loggedUserData.email,
      refreshToken: loggedUserData.refreshToken,
    };
    this.http
      .post(`${environment.apiUBaseURL}/api/auth/refresh`, obj)
      .subscribe((res: any) => {
        localStorage.setItem(
          'accessToken',
          JSON.stringify(res.data?.accessToken)
        );
      });
  }

  getUsers() {
    return this.http.get(`${environment.apiUBaseURL}/api/user/get-users`);
  }

  getUser(obj: any) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/user/get-user/${obj.id}`
    );
  }

  onUpdateUser(obj: any) {
    return this.http.put(
      `${environment.apiUBaseURL}/api/user/update-user/${obj.id}`,
      obj
    );
  }

  onDeleteUser(obj: any) {
    return this.http.delete(
      `${environment.apiUBaseURL}/api/user/delete-user/${obj.id}`
    );
  }
}
