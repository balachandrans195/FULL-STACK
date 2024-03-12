// recep-add-patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService {
  private apiUrl =  'http://localhost:8000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  addPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/receptionist`, patientData);
    // Adjust the endpoint and HTTP method based on your backend API
   

  }
}


