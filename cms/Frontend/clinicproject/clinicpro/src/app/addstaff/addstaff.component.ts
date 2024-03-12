// Import necessary modules
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StaffService } from '../staff.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-staff',
  templateUrl: './addstaff.component.html',
  styleUrls: ['./addstaff.component.scss']
})
export class AddStaffComponent {
  @ViewChild('staffForm') staffForm!: NgForm; // Reference to the form

  // Object to store staff data
  persons = [{ id: 325326, firstname: "Dan", lastname: "Tiger", }, { id: 325326, firstname: "Fan", lastname: "Tiger", }]
  staffData: any = {
    staff_name: '',
    phno: '',
    address: '',
    dob: '',
    qualification: '',
    salary: '0',
    doj: '1900-01-01', // Placeholder date
    status: '1',
    email: '',
    department: '4',
    gender: '',
    blood_group: '',
    role: '',
    consultation_fee: '0',
    Duty_time: '0',
    password: '',
  };

  // Constructor to inject services
  constructor(
    private staffService: StaffService,
    private snackBar: MatSnackBar
  ) { }

  // Function to register staff
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

    // Register staff through service
    this.staffService.registerStaff(this.staffData).subscribe(
      response => {
        console.log('Registration successful:', response);
        alert("Registration successful")
        // Handle successful registration, e.g., navigate to another component
      },
      error => {
        console.error('Registration failed:', error);
        this.openSnackBar('', error);

        // Handle registration error, e.g., display an error message
      }
    );
  }

  // Function to validate Date of Birth
  private isValidDob(): { isValid: boolean; errorMessage?: string } {
    const dobYear = new Date(this.staffData.dob).getFullYear();

    if (dobYear <= 1998) {
      return { isValid: true };
    } else {
      return { isValid: false, errorMessage: 'Please enter a valid Date of Birth (before 1998).' };
    }
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

  isValidContact(): boolean {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(this.staffData.phno);
  }
  


  isValidSalary(): boolean {
    // Check if the salary is above 3000
    return this.staffData.salary > 3000;
  }

  isValidPassword(): boolean {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return passwordRegex.test(this.staffData.password);
  }
}
