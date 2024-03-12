import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-patientgivemed',
  templateUrl: './patientgivemed.component.html',
  styleUrls: ['./patientgivemed.component.scss']
})
export class PatientgivemedComponent implements OnInit {
  medicines: any[] = [];
  selectedMedicine: String | undefined;
  quantity: number | undefined;

  constructor(private bookAppointmentService: BookAppointmentService) {}

  ngOnInit(): void {
    this.getMedicines();
  }

  getMedicines() {
    this.bookAppointmentService.getMedicine().subscribe(
      (data: any[]) => {
        this.medicines = data.map(medicine => ({
          ...medicine,
          price_per_unit: +medicine.price_per_unit
        }));
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );
  }

  submitForm() {
    const randomNumber = Math.floor(Math.random() * 101) + 130; // Generates a random number between 70 and 80
    console.log("booked:", randomNumber);
  
    alert(`Booking successful! Your booking bill with GSD  is: ${randomNumber}`);
  }
  
  
}
