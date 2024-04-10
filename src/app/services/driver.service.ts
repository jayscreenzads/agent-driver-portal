import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private http: HttpClient) {}

  onGetDrivers() {
    return this.http.get(`${environment.apiUBaseURL}/api/driver/get-drivers`);
  }

  onGetDriver(obj: any) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/driver/get-driver/${obj.id}`
    );
  }

  onCreateDriver(obj: any) {
    return this.http.post(
      `${environment.apiUBaseURL}/api/driver/create-driver`,
      obj
    );
  }

  onUpdateDriver(obj: any) {
    return this.http.put(
      `${environment.apiUBaseURL}/api/driver/update-driver/${obj.id}`,
      obj
    );
  }

  onDeleteDriver(obj: any) {
    return this.http.delete(
      `${environment.apiUBaseURL}/api/driver/update-driver/${obj.id}`
    );
  }
}
