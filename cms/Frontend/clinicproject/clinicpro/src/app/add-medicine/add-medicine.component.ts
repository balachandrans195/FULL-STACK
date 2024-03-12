import { Component } from '@angular/core';
import { BookAppointmentService } from '../book-appointment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.scss']
})
export class AddMedicineComponent {
  medicineForm: FormGroup;

  constructor(private medicineService: BookAppointmentService, private fb: FormBuilder) {
    this.medicineForm = this.fb.group({
      generic_name: ['', Validators.required],
      med_name: ['', Validators.required],
      price_per_unit: [0, [Validators.required, Validators.min(1)]], // Adjust min value as needed
      exp_date: ['', [Validators.required, this.futureDateValidator]]
    });
  }

  addMedicine(): void {
    if (this.medicineForm.valid) {
      const medicine = this.medicineForm.value;

      // Format the date as 'YYYY-MM-DD'
      medicine.exp_date = new Date(medicine.exp_date).toISOString().split('T')[0];

      this.medicineService.addMedicine(medicine).subscribe(
        (response) => {
          console.log('Medicine added successfully:', response);
          alert('Medicine added successfully');
          // Reset form or handle success
          this.medicineForm.reset();
        },
        (error) => {
          console.error('Error adding medicine:', error);
          alert('Error adding medicine');
          // Handle errors or show error messages to the user
        }
      );
    } else {
      // Handle form validation errors
      alert('Please correct the form errors before submitting.');
    }
  }

  futureDateValidator(control: { value: string | number | Date; }) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      return { futureDate: true };
    }
    return null;
  }
}
