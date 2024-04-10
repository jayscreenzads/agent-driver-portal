import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  onGetVehicles() {
    return this.http.get(`${environment.apiUBaseURL}/api/vehicle/get-vehicles`);
  }

  onGetVehicle(obj: any) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/vehicle/get-vehicle/${obj.id}`
    );
  }

  onCreateVehicle(obj: any) {
    return this.http.post(
      `${environment.apiUBaseURL}/api/vehicle/create-vehicle`,
      obj
    );
  }

  onUpdateVehicle(obj: any) {
    return this.http.put(
      `${environment.apiUBaseURL}/api/vehicle/update-vehicle/${obj.id}`,
      obj
    );
  }

  onDeleteVehicle(obj: any) {
    return this.http.delete(
      `${environment.apiUBaseURL}/api/vehicle/update-vehicle/${obj.id}`
    );
  }
}
