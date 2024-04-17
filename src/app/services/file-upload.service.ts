import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest(
      'POST',
      `${environment.apiUBaseURL}/upload`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }
}
