import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AccountApprovalService {
  constructor(private http: HttpClient) {}

  onGetAccount(userId: number) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/account-approval/get-account/${userId}`
    );
  }

  onUpdateAccount(obj: any, userId: number) {
    return this.http.put(
      `${environment.apiUBaseURL}/api/account-approval/update-account/${userId}`,
      obj
    );
  }
}
