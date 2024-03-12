// patient-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit {

  receptionistDetails: any; // Update the type based on your API response

  constructor(
    private route: ActivatedRoute,
    private bookAppointmentService: BookAppointmentService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const registerId = +params['register_id']; // Use 'register_id' here

      console.log('Register ID:', registerId);

      if (!isNaN(registerId)) {
        this.fetchReceptionistDetails(registerId);
      } else {
        console.error('Invalid register_id in the route parameters.');
      }
    });
  }

  fetchReceptionistDetails(registerId: number) {
    this.bookAppointmentService.getReceptionistDetails(registerId).subscribe(
      (data) => {
        console.log('Fetched Data:', data);
        this.receptionistDetails = data;
      },
      (error) => {
        console.error('Error fetching receptionist details', error);
      }
    );
  }
}
