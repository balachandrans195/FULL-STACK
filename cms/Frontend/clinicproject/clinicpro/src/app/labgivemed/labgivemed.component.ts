// labgivemed.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-labgivemed',
  templateUrl: './labgivemed.component.html',
  styleUrls: ['./labgivemed.component.scss']
})
export class LabgivemedComponent {
  labTests = [
    { id: 2, testName: 'Complete Blood Count (CBC)', price: 574.00 },
    { id: 3, testName: 'Blood Glucose (Fasting)', price: 635.00 },
    { id: 4, testName: 'Blood Glucose (Postprandial)', price: 345.00 },
    { id: 5, testName: 'Lipid Profile (Cholesterol)', price: 555.00 },
    { id: 6, testName: 'Lipid Profile (Triglycerides)', price: 645.00 },
    { id: 7, testName: 'Lipid Profile (HDL)', price: 645.00 },
    { id: 8, testName: 'Lipid Profile (LDL)', price: 656.00 }
  ];

  selectedTest: any = null;

  applyLabTest() {
    // Handle the logic to submit the lab test data
    console.log('Lab test applied:', this.selectedTest);
    alert("Test Booked successfully")
    // You can call a service to send this data to the server
    // For now, just log it to the console
  }
}
