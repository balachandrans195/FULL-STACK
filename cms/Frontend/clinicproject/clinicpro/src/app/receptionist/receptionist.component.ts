// receptionist.component.ts

import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.scss'],
})
export class ReceptionistComponent implements OnInit {
  bookedAppointments: any[] = [];
  filteredAppointments: any[] = [];
  searchQuery: string = '';

  constructor(private bookAppointmentService: BookAppointmentService) {}

  ngOnInit(): void {
    this.loadBookedAppointments();
  }

  loadBookedAppointments() {
    this.bookAppointmentService.getBookedAppointment().subscribe(
      (data) => {
        this.bookedAppointments = data;
        this.filteredAppointments = [...this.bookedAppointments];
      },
      (error) => {
        console.error('Error fetching booked appointments:', error);
      }
    );
  }

  deleteAppointment(appointmentId: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.bookAppointmentService.deleteAppointment(appointmentId).subscribe(
        () => {
          console.log('Appointment deleted successfully');
          this.loadBookedAppointments(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting appointment:', error);
        }
      );
    }
  }

  filterAppointments(): void {
    if (!this.searchQuery) {
      // If the search query is empty, display all appointments
      this.filteredAppointments = [...this.bookedAppointments];
    } else {
      // Filter appointments based on the search query
      this.filteredAppointments = this.bookedAppointments.filter((appointment) =>
        this.matchSearchQuery(appointment)
      );
    }
  }

  matchSearchQuery(appointment: any): boolean {
    const lowerCaseQuery = this.searchQuery.toLowerCase();

    // Check if the properties are strings before using toLowerCase
    const tokenNoIncludes = appointment.token_no?.toLowerCase?.().includes(lowerCaseQuery);
    const registerIdIncludes = appointment.register_id?.toLowerCase?.().includes(lowerCaseQuery);
    const staffIdIncludes = appointment.staff_id?.toLowerCase?.().includes(lowerCaseQuery);

    return tokenNoIncludes || registerIdIncludes || staffIdIncludes;
  }
}
