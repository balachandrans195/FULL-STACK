import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  private apiUrl = 'http://localhost:8000';  // Replace with your Django API URL

  constructor(private http: HttpClient) {}

  registerStaff(staffData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register/`, staffData);
  }
}