import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  onGetStatistics() {
    return this.http.get(
      `${environment.apiUBaseURL}/api/statistic/get-statistics`
    );
  }

  onGetStatistic(obj: any) {
    return this.http.get(
      `${environment.apiUBaseURL}/api/statistic/get-statistic/${obj.id}`
    );
  }

  onCreateStatistic(obj: any) {
    return this.http.post(
      `${environment.apiUBaseURL}/api/statistic/create-statistic`,
      obj
    );
  }

  onUpdateStatistic(obj: any) {
    return this.http.put(
      `${environment.apiUBaseURL}/api/statistic/update-statistic/${obj.id}`,
      obj
    );
  }

  onDeleteStatistic(obj: any) {
    return this.http.delete(
      `${environment.apiUBaseURL}/api/statistic/update-statistic/${obj.id}`
    );
  }
}
