import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  staffId: number | null = null;
  appointments: any[] = [];
  currentDateAppointments: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private appointmentService: BookAppointmentService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const staffIdParam = params.get('staffId');
      this.staffId = staffIdParam ? +staffIdParam : null;

      if (this.staffId !== null) {
        this.getAppointmentsData(this.staffId);
      }
    });
  }

  getAppointmentsData(staffId: any) {
    this.appointmentService.getAppointmentsByStaffId(staffId).subscribe(
      (data) => {
        console.log('Raw Data:', data);

        const currentDate = new Date();
        const formattedCurrentDate = this.formatDate(currentDate);

        this.appointments = data;
        this.currentDateAppointments = this.appointments.filter(appointment => {
          const appointmentDate = this.formatDate(new Date(appointment.appointment_date));
          console.log('Appointment Date:', appointmentDate);
          return appointmentDate === formattedCurrentDate;
        });
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // doctor.component.ts
deleteAppointment(appointmentId: number): void {
  this.appointmentService.deleteAppointment(appointmentId).subscribe(
    () => {
      this.getAppointmentsData(this.staffId);
      console.log('Appointment deleted successfully');
    },
    (error) => {
      console.error('Error deleting appointment', error);
    }
  );
}

  

  takeDiagnosis(appointment: any): void {
    console.log('Taking Diagnosis for appointment:', appointment);
    const registerId = appointment.register_id;

    if (registerId) {
      this.router.navigate(['/diagnosis', registerId]);
    } else {
      console.error('No register_id found in the selected appointment.');
    }
  }

  submit(appointment: any): void {
    this.router.navigate(['/diagnosis/', appointment.register_id]);
    console.log(appointment);
  }
  goToPatientHistory(registerId: number): void {
    // Navigate to patient history component with the corresponding register id
    this.router.navigate(['/patient-history', registerId]);
  }
  goToPatientDetails(registerId: number) {
    // Navigate to the patient details page and pass the register_id as a parameter
    this.router.navigate(['/patient-details', registerId]);
  }
}
