// patientcare.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-patientcare',
  templateUrl: './patientcare.component.html',
  styleUrls: ['./patientcare.component.scss']
})
export class PatientCareComponent implements OnInit {
  diagnosisData: any[] = [];

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDiagnosisData();
  }

  getDiagnosisData() {
    this.bookAppointmentService.GetDiagnosis().subscribe(
      (response: any) => {
        this.diagnosisData = response;
      },
      (error) => {
        console.error('Error fetching diagnosis data:', error);
      }
    );
  }

  proceed(registerId: number) {
    // Navigate to the 'patientgivemed' component with the 'register_id' parameter
    this.router.navigate(['/patientgivemed', registerId]);
    console.log(registerId)
  }

  deleteDiagnosis(diagnosisId: number) {
    // Call the service method to delete the diagnosis
    this.bookAppointmentService.deleteDiagnosis(diagnosisId).subscribe(
      () => {
        // Remove the deleted diagnosis from the local array
        this.diagnosisData = this.diagnosisData.filter(diagnosis => diagnosis.diagnosis_id !== diagnosisId);
        console.log('Diagnosis deleted successfully.');
      },
      (error) => {
        console.error('Error deleting diagnosis:', error);
      }
    );
  }
}
