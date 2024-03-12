// recep-book-appointment.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RecepBookAppointmentService } from '../recep-book-appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recep-book-appointment',
  templateUrl: './recep-book-appointment.component.html',
  styleUrls: ['./recep-book-appointment.component.scss'],
})
export class RecepBookAppointmentComponent implements OnInit {
  last5PatientDetails: any[] = [];
  filteredPatients: any[] = [];
  searchQuery: string = '';

  constructor(
    private patientService: RecepBookAppointmentService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadLast5PatientDetails();
  }

  loadLast5PatientDetails() {
    this.patientService.getLast5PatientDetails().subscribe(
      (data: any) => {
        console.log('Fetched data:', data);

        if (data && data.response && Array.isArray(data.response)) {
          // Extract the array from the 'response' property
          this.last5PatientDetails = data.response.slice().reverse().slice();
          // Initialize isEditing flag for each patient
          this.last5PatientDetails.forEach((patient) => (patient.isEditing = false));
          // Set filteredPatients initially
          this.filteredPatients = this.last5PatientDetails;
        } else {
          console.error('Invalid data format:', data);
        }

        this.cdr.detectChanges(); // Trigger change detection
      },
      (error) => {
        console.error('Error fetching patient details:', error);
      }
    );
  }

  bookAppointment(patientId: number) {
    if (patientId !== undefined) {
      this.router.navigate([`/recep-apply-appointment/${patientId}`]);
    } else {
      console.error('Patient ID is undefined.');
      // Handle the error or log a message accordingly
    }
  }

  startEditing(patient: any) {
    // Set isEditing to true for the patient to show Save button
    patient.isEditing = true;
  }

  saveChanges(patient: any) {
    const patientId = patient.register_id; // Adjust this based on your patient object structure

    const updatedDetails = {
      first_name: patient.first_name,
      last_name: patient.last_name,
      email: patient.email,
      blood_group: patient.blood_group,
      contact: patient.contact,
      address: patient.address,
      gender: patient.gender,
      dob: patient.dob,
      dov: patient.dov,
      weight: patient.weight,
      height: patient.height,
      age: patient.age,
      // Add other fields you want to update
    };

    this.patientService.updatePatientDetails(patientId, updatedDetails).subscribe(
      (response) => {
        console.log('Patient details updated successfully:', response);
        // alert("Patient details updated successfully")
        // Set isEditing to false for the patient to show Edit button after saving
        patient.isEditing = false;
      },
      (error) => {
        console.error('Error updating patient details:', error);
        alert("Error updating patient details")
        // Handle errors or show error messages to the user
      }
    );
  }

  // Filter patients based on search query
  filterPatients() {
    this.filteredPatients = this.last5PatientDetails.filter((patient) =>
      this.matchSearchQuery(patient)
    );
  }

  // Check if a patient matches the search query
  matchSearchQuery(patient: any): boolean {
    const lowerCaseQuery = this.searchQuery.toLowerCase();
    return (
      patient.first_name.toLowerCase().includes(lowerCaseQuery) ||
      patient.last_name.toLowerCase().includes(lowerCaseQuery) ||
      patient.register_id.toString().includes(this.searchQuery) ||
      patient.contact.includes(this.searchQuery) ||
      patient.dov.includes(this.searchQuery)
    );
  }
}
