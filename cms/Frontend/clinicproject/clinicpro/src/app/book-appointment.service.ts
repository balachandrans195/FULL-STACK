// book-appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookAppointmentService {
  getPatientHistory(registerId: number | undefined) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  bookAppointment(appointmentData: any): Observable<any> {
    const url = `${this.apiUrl}/bookappointment/`;
    return this.http.post(url, appointmentData);
  }


  getBookedAppointment(): Observable<any> {
    const url = `${this.apiUrl}/bookappointment/`;
    return this.http.get(url);
  }


  getbookedappoinment(appointmentData: any): Observable<any> {
    const url = `${this.apiUrl}/bookappointment/${appointmentData}`;
    return this.http.get(url, appointmentData);
  }

  getStaffListByRoleId(roleId: number): Observable<any[]> {
    const params = new HttpParams().set('role_id', roleId.toString());
    return this.http.get<any[]>(`${this.apiUrl}/staff/`, { params });
  }

  getAppointmentsByStaffId(staffId: number): Observable<any[]> {
    const url = `${this.apiUrl}/bookappointment/staff/${staffId}/`;
    return this.http.get<any[]>(url);
  }

  // deleteAppointment(staffId: number, appointmentId: number): Observable<any> {
  //   const url = `${this.apiUrl}/bookappointment/staff/${staffId}/${appointmentId}/`;
  //   return this.http.delete(url);
  // }

  getDepartmentsByStaffId(staffId: number): Observable<any[]> {
    const url = `${this.apiUrl}/departments/staff/${staffId}/`;
    return this.http.get<any[]>(url);
  }

  getDiagnosisbyregid(registerId: number): Observable<any> {
    const url = `${this.apiUrl}/diagnosis/${registerId}/`;
    return this.http.get<any>(url);
  }

  getDepartmentById(departmentId: number | undefined): Observable<any> {
    if (departmentId === undefined) {
      return of({ department_name: 'Not available' });
    }
  
    

    const url = `${this.apiUrl}/departments/${departmentId}`;
    return this.http.get<any>(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching department:', error);
        return of({ department_name: 'Not available' });
      })
    );
  }

  postDiagnosis(appointmentData: any): Observable<any> {
    const url = `${this.apiUrl}/diagnosis/`;
    return this.http.post(url, appointmentData);
  }

  GetDiagnosis(appointmentData?: any): Observable<any> {
    const url = `${this.apiUrl}/diagnosis/`;
    return this.http.get(url, { params: appointmentData });
  }

  addMedicine(medicineData: any): Observable<any> {
    const url = `${this.apiUrl}/medicines/`;
    return this.http.post(url, medicineData);
  }

  getMedicine(): Observable<any> {
    const url = `${this.apiUrl}/medicines/`;
    return this.http.get(url);
  }

  deleteMedicine(medId: number): Observable<any> {
    const url = `${this.apiUrl}/medicines/${medId}/`;
    return this.http.delete(url);
  }
  deleteAppointment(appointmentId: number): Observable<any> {
  const url = `${this.apiUrl}/bookappointment/${appointmentId}/`;
  return this.http.delete(url);
  }


  deleteDiagnosis(diagnosisId: number): Observable<any> {
    const url = `${this.apiUrl}/diagnosises/${diagnosisId}/`;
    return this.http.delete(url);
  }



  getLabTests(): Observable<any> {
    const url = `${this.apiUrl}/labtests/`;
    return this.http.get(url);
  }

  getLabTest(testId: number): Observable<any> {
    const url = `${this.apiUrl}/labtests/${testId}/`;
    return this.http.get(url);
  }

  getReceptionistDetails(receptionistId: number): Observable<any> {
    const url = `${this.apiUrl}/receptionist/${receptionistId}/`;
    return this.http.get(url);
      
  }

  createLabTest(labTestData: any): Observable<any> {
    const url = `${this.apiUrl}/labtests/`;
    return this.http.post(url, labTestData);
  }

  updateLabTest(testId: number, labTestData: any): Observable<any> {
    const url = `${this.apiUrl}/labtests/${testId}/`;
    return this.http.put(url, labTestData);
  }

  deleteLabTest(testId: number): Observable<any> {
    const url = `${this.apiUrl}/labtests/${testId}/`;
    return this.http.delete(url);
  }


}
