import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  onOTPSend(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/otp/send-otp`, obj);
  }

  onOTPVerify(obj: any) {
    return this.http.post(`${environment.apiUBaseURL}/api/otp/verify-otp`, obj);
  }
}
