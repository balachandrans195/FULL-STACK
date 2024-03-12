import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:8000';  // Replace with your Django API URL

  constructor(private http: HttpClient) {}

  registerStaff(staffData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register/`, staffData);
  }


  getstaff(): Observable<any[]> {
    // Use the correct endpoint for fetching patient details
    return this.http.get<any[]>(`${this.apiUrl}/staff/`);
  }

  updateStaffDetails(staff: StaffData): Observable<any> {
    const url = `${this.apiUrl}/staff/${staff.staff_id}/`; // Replace with your actual endpoint
    return this.http.put(url, staff);
  }
  

}
interface StaffData {
  staff_id: number;
  staff_name: string;
  phno: string;
  address: string;
  dob: Date;
  qualification: string;
  salary: number;
  doj: Date;
  status: string;
  department: any;
  email: string;
  role: any;
  gender: string;
  blood_group: string;
  password: string;
  Duty_time: string;
  consultation_fee: number;
}