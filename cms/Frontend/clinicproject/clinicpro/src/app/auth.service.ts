// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Url = 'http://localhost:8000/api/login/';  // Replace with your Django API endpoint
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.Url, { email, password });
  }

  registerStaff(staffData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register/`, staffData);
  }
}
 