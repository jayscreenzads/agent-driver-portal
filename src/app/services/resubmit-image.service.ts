import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ResubmitImageService {
  constructor(private http: HttpClient) {}

  onGetAccount(userId: number) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/resubmit-image/get-account/${userId}`
    );
  }

  onResubmitImage(obj: any) {
    return this.http.post(
      `${environment.apiUBaseURL}/api/resubmit-image/resubmit-image`,
      obj
    );
  }

  onEmailResubmittedImage(obj: any) {
    return this.http.post(
      `${environment.apiUBaseURL}/api/resubmit-image/email-resubmitted-image`,
      obj
    );
  }
}
