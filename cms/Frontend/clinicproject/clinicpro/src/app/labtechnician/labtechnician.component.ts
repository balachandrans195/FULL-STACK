import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
  selector: 'app-labtechnician',
  templateUrl: './labtechnician.component.html',
  styleUrls: ['./labtechnician.component.scss']
})
export class LabtechnicianComponent implements OnInit {

  labTests: any[] = [];
  filteredLabTests: any[] = [];
  searchTerm: string = '';
  router: any;

  constructor(private labTestService: BookAppointmentService) {}

  ngOnInit(): void {
    this.fetchLabTests();
  }

  fetchLabTests() {
    this.labTestService.getLabTests().subscribe(
      response => {
        if (response && Array.isArray(response.data)) {
          this.labTests = response.data.map((test: { test_name: any; low_range: any; high_range: any; price: any; }) => ({
            ...test,
            isEditing: false,
            editedTestName: test.test_name,
            editedLowRange: test.low_range,
            editedHighRange: test.high_range,
            editedPrice: test.price
          }));
          this.searchLabTests();
        } else {
          console.error('Lab Tests response does not contain an array:', response);
        }
      },
      error => {
        console.error('Error fetching Lab Tests:', error);
      }
    );
  }
  goToLabCare() {
    // Navigate to the labcare route when "Patient Care" button is clicked
    this.router.navigate(['/labcare']);
  }

  searchLabTests() {
    this.filteredLabTests = this.labTests.filter(test => {
      const search = this.searchTerm.toLowerCase();
      return (
        test.test_name.toLowerCase().includes(search) ||
        test.low_range.toString().includes(search) ||
        test.high_range.toString().includes(search) ||
        test.price.toString().includes(search)
      );
    });
  }

  editLabTest(labTest: any) {
    labTest.isEditing = true;
  }

  saveLabTest(labTest: any) {
    labTest.isEditing = false;
    // Call the API to save changes using labTest.editedTestName, labTest.editedLowRange, etc.
    this.labTestService.updateLabTest(labTest.test_id, {
      test_name: labTest.editedTestName,
      low_range: labTest.editedLowRange,
      high_range: labTest.editedHighRange,
      price: labTest.editedPrice
    }).subscribe(
      response => {
        console.log('Lab Test updated successfully:', response);
        // Refresh the lab test list after updating
        this.fetchLabTests();
      },
      error => {
        console.error('Error updating Lab Test:', error);
      }
    );
  }

  deleteLabTest(testId: number) {
    // Call the API service to delete the lab test
    this.labTestService.deleteLabTest(testId).subscribe(
      response => {
        console.log('Lab Test deleted successfully:', response);
        // Refresh the lab test list after deleting
        this.fetchLabTests();
      },
      error => {
        console.error('Error deleting Lab Test:', error);
      }
    );
  }
}
