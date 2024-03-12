// patient-history.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';
import { HttpErrorResponse } from '@angular/common/http';

interface Diagnosis {
  diagnosis_id: number;
  register_id: number;
  diagnosis: string;
  Medicine_prefered: string;
  Take_test: string;
  notes: string;
}

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.scss']
})
export class PatientHistoryComponent implements OnInit {
  registerId: number | undefined;
  diagnosisData: Diagnosis[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientHistoryService: BookAppointmentService
  ) {}

  ngOnInit(): void {
    // Get the registerId from the route parameters
    this.route.params.subscribe(params => {
      this.registerId = +params['registerId']; // Convert to a number
      if (isNaN(this.registerId) || this.registerId === undefined) {
        this.registerId = undefined; // Set to undefined if it's not a valid number
      }

      if (this.registerId !== undefined) {
        this.fetchDiagnosisData();
      }
    });
  }

  fetchDiagnosisData() {
    // Fetch patient history data based on the registerId
    this.patientHistoryService.getDiagnosisbyregid(this.registerId!).subscribe(
      (response: Diagnosis[] | undefined) => {
        console.log('Diagnosis data retrieved successfully:', response);
        if (response) {
          this.diagnosisData = response;
        } else {
          console.error('Invalid response format:', response);
        }
        // You can perform additional logic with the retrieved data if needed
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching diagnosis data:', error);
        if (error instanceof HttpErrorResponse) {
          console.error(`Status: ${error.status}, ${error.statusText}`);
          console.error('Response body:', error.error);
        }
      }
    );
  }

}
