import { Component } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.scss']
})
export class AdddoctorComponent {

  staffData: any = {
    staff_name: '',
    phno: '',
    address: '',
    dob: '',
    qualification: '',
    salary: '',
    doj: '1900-01-01', // Placeholder date
    status: '1',
    email: '',
    department: '',
    gender: '',
    blood_group: '',
    role: '2',
    consultation_fee: '0',
    Duty_time: '',
    password: '',
  };

  constructor(private doctorService: DoctorService,
    private snackBar: MatSnackBar) {}

  registerStaff() {
    // Check if Date of Birth is valid
    const dobValidationResult = this.isValidDob();

    if (!dobValidationResult.isValid) {
      this.openSnackBar(dobValidationResult.errorMessage || 'Invalid Date of Birth');
      return;
    }

    // Convert '0000-00-00' to the placeholder date
    this.staffData.doj = this.staffData.doj === '0000-00-00' ? '1900-01-01' : this.staffData.doj;

    // Validate email using regular expression
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(this.staffData.email)) {
      this.openSnackBar('Please enter a valid Gmail address.');
      return;
    }

    // Validate password using regular expression
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(this.staffData.password)) {
      this.openSnackBar('Password should be at least 6 characters with a combination of alphabets and numbers.');
      return;
    }

    // Validate duty time
    if (!this.isValidDutyTime()) {
      this.openSnackBar('Please enter a valid Duty Time in the format of 00AM - 00PM');
      return;
    }

    this.doctorService.registerStaff(this.staffData).subscribe(
      response => {
        console.log('Registration successful:', response);
        alert("Registration Successful");
        // Handle successful registration, e.g., navigate to another component
      },
      error => {
        console.error('Registration failed:', error);
        alert("Registration failed:");
        // Handle registration error, e.g., display an error message
      }
    );
  }

  private isValidDob(): { isValid: boolean; errorMessage?: string } {
    const dobYear = new Date(this.staffData.dob).getFullYear();

    if (dobYear <= 1993) {
      return { isValid: true };
    } else {
      return { isValid: false, errorMessage: 'Please enter a valid Date of Birth (before 1993).' };
    }
  }

  isValidConsultationFee(): boolean {
    // Check if the consultation fee is not negative
    return this.staffData.consultation_fee >= 0;
  }

  isValidPassword(): boolean {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(this.staffData.password);
  }

  isValidDutyTime(): boolean {
    // Check if the duty time is in the format of 00AM - 00PM
    const dutyTimeRegex = /^(0[1-9]|1[0-2])([APap][Mm])\s?-\s?(0[1-9]|1[0-2])([APap][Mm])$/;
    return dutyTimeRegex.test(this.staffData.Duty_time);
  }

  isValidPhoneNumber(): boolean {
    // Check if the phone number has 10 digits
    return /^[0-9]{10}$/.test(this.staffData.phno);
  }

  isValidSalary(): boolean {
    // Check if the salary is above 3000
    return this.staffData.salary > 3000;
  }

  // Function to open a snackbar
  private openSnackBar(message: string, error?: any): void {
    let formattedMessage = message;

    if (error && error.error) {
      // If there is an error object, concatenate its properties to the message
      const errorMessage = error.error.response.email || 'Unknown error';
      formattedMessage += '\n' + errorMessage;
    }

    // Open snackbar with formatted message
    this.snackBar.open(formattedMessage, 'Close', {
      duration: 3000, // Set the duration for how long the snackbar should be visible
    });
  }
}
