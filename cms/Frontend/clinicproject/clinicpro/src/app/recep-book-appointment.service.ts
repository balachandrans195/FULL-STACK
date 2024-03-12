// recep-book-appointment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecepBookAppointmentService {
  private apiUrl = 'http://localhost:8000'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getLast5PatientDetails(): Observable<any[]> {
    // Use the correct endpoint for fetching patient details
    return this.http.get<any[]>(`${this.apiUrl}/receptionists/`);
  }

  updatePatientDetails(patientId: number, updatedDetails: any): Observable<any> {
    const url = `${this.apiUrl}/receptionists/${patientId}/`; // Replace with your actual API endpoint

    // Assuming your API supports PATCH or PUT for updating patient details
    return this.http.put(url, updatedDetails);
  }
}
