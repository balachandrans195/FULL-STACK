import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recep-apply-appointment',
  templateUrl: './recep-apply-appointment.component.html',
  styleUrls: ['./recep-apply-appointment.component.scss']
})
export class RecepApplyAppointmentComponent implements OnInit {
  appointmentData: any = {
    token_no: '',
    register_id: '',
    staff_id: '',
    apnt_date: ''
  };
  staffList: any[] = [];
  filteredData: any[] = [];
  billNumber: number | undefined;

  constructor(
    private bookAppointmentService: BookAppointmentService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.appointmentData.register_id = data['register_id'];
    });

    this.bookAppointmentService.getStaffListByRoleId(2).subscribe(
      data => {
        this.staffList = data;
        this.filterDoctorData(2);
      },
      error => {
        console.error('Error fetching staff list:', error);
      }
    );
  }

  filterDoctorData(roleId: any) {
    this.filteredData = this.staffList.filter(item => item.role === roleId);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    // Generate a random bill number between 300 and 500
    this.billNumber = Math.floor(300 + Math.random() * 201);

    // Generate a 4-digit random number
    this.appointmentData.token_no = Math.floor(1000 + Math.random() * 9000).toString();

    if (
      this.appointmentData.register_id &&
      this.appointmentData.staff_id &&
      this.appointmentData.apnt_date
    ) {
      // Check if the selected date is in the future
      const selectedDate = new Date(this.appointmentData.apnt_date).getTime();
      const currentDate = new Date().getTime();

      // Check if the selected date is within the next 10 days
      const tenDaysInMilliseconds = 10 * 24 * 60 * 60 * 1000;
      const tenDaysFromNow = currentDate + tenDaysInMilliseconds;

      if (selectedDate >= currentDate && selectedDate <= tenDaysFromNow) {
        // Proceed with appointment booking
        this.bookAppointmentService.bookAppointment(this.appointmentData).subscribe(
          response => {
            console.log('Appointment booked successfully:', response);
            alert("YOUR Token Number is : " + this.appointmentData.token_no);
            alert("YOUR BILL  WITH GST IS  ₹  :  " + this.billNumber); // Display success message

            this.showSuccessToast('APPOINTMENT SUCCESSFUL'); // Display success message

            // Navigate to diagnosis component with the corresponding register_id
          },
          error => {
            console.error('Appointment booking failed:', error);
            this.showErrorToast('Already Booked'); // Display error message

            // Handle appointment booking error, e.g., display an error message
          }
        );
      } else if (selectedDate < currentDate) {
        alert('Expired date cannot be allowed.');
      } else {
        alert('Appointment date should be within the next 10 days.');
      }
    }
  }

  validateAppointmentTime() {
    const selectedDate = new Date(this.appointmentData.apnt_date);
    const selectedHour = selectedDate.getHours();
    
    const startHour = 9; // 9 am
    const endHour = 18; // 6 pm

    if (selectedHour < startHour || selectedHour >= endHour) {
      alert('Doctor not available.');
      this.appointmentData.apnt_date = null; // Reset the invalid date
    }
  }

  isAppointmentTimeValid() {
    if (!this.appointmentData.apnt_date) {
      return true; // If no date is selected, consider it valid
    }

    const selectedDate = new Date(this.appointmentData.apnt_date);
    const selectedHour = selectedDate.getHours();
    
    const startHour = 9; // 9 am
    const endHour = 18; // 6 pm

    return selectedHour >= startHour && selectedHour < endHour;
  }

  showErrorToast(message: string) {
    this.toastr.error(message, 'Error', {
      closeButton: true,
      timeOut: 5000, // Set the duration for how long the toast should be visible
    });
  }

  showSuccessToast(message: string) {
    const toastMessage = `APPOINTMENT BOOKED SUCCESSFULLY`;
    this.toastr.success(toastMessage, 'Success', {
      closeButton: true,
      timeOut: 5000, // Set the duration for how long the toast should be visible
    });
  }
}
