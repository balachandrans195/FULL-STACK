import { Component, NgZone } from '@angular/core';
import { ReceptionistService } from '../recep-add-patient.service';

@Component({
  selector: 'app-recep-add-patient',
  templateUrl: './recep-add-patient.component.html',
  styleUrls: ['./recep-add-patient.component.scss']
})
export class RecepAddPatientComponent {
  receptionistForm: any = {
    first_name: "",
    last_name: "",
    blood_group: "",
    contact: "",
    address: "",
    gender: "",
    dob: "",
    email: "",
    dov: '',
    weight: "",
    height: "",
    age: ""
  };

  dobError: boolean = false;
  weightError: boolean = false;
  heightError: boolean = false;
  ageError: boolean = false;
  emailError: string = '';

  constructor(
    private receptionistService: ReceptionistService,
    private ngZone: NgZone
  ) {}

  validateDob(): void {
    const selectedDate = new Date(this.receptionistForm.dob);
    const today = new Date();
  
    this.ngZone.run(() => {
      this.dobError = selectedDate > today;
    });
  
    // Calculate age based on Date of Birth
    const dobDate = new Date(this.receptionistForm.dob);
    const diffTime = Math.abs(today.getTime() - dobDate.getTime());
    this.receptionistForm.age = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  isValidContact(): boolean {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(this.receptionistForm.contact);
  }
  
  validateHeight(): void {
    this.ngZone.run(() => {
      this.heightError = +this.receptionistForm.height < 10;
    });
  }

  validateWeight(): void {
    this.ngZone.run(() => {
      this.weightError = +this.receptionistForm.weight < 10;
    });
  }

  validateAge(): void {
    this.ngZone.run(() => {
      this.ageError = +this.receptionistForm.age <= 0;
    });
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(this.receptionistForm.email);

    if (!isValidEmail) {
      this.emailError = 'Please enter a valid email address.';
    } else {
      this.emailError = ''; // Clear the error message if email is valid
    }

    return isValidEmail;
  }

  onSubmit() {
    if (!this.dobError && !this.weightError && !this.heightError && !this.ageError && this.validateEmail()) {
      this.receptionistForm.dov = new Date().toISOString().split('T')[0];

      this.receptionistService.addPatient(this.receptionistForm).subscribe(
        response => {
          alert("Successfully Registered");
          console.log('Receptionist registration successful:', response);
          // Handle successful registration, e.g., navigate to another component
        },
        error => {
          console.error('Receptionist registration failed:', error);
          alert("registration failed")
          // Handle registration error, e.g., display an error message
        }
      );
    }
  }
}
