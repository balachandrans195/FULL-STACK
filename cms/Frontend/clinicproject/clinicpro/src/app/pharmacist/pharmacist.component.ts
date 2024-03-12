
import { Component, OnInit } from '@angular/core';
import { BookAppointmentService } from '../book-appointment.service';

@Component({
    selector: 'app-pharmacist',
    templateUrl: './pharmacist.component.html',
    styleUrls: ['./pharmacist.component.scss'],
})
export class PharmacistComponent implements OnInit {
    medicines: any[] = [];
    filteredMedicines: any[] = [];
    searchQuery: string = '';

    constructor(private medicineService: BookAppointmentService) {}

    ngOnInit(): void {
        this.fetchMedicines();
    }

    fetchMedicines(): void {
        this.medicineService.getMedicine().subscribe(
            (response) => {
                this.medicines = response;
                this.filteredMedicines = [...this.medicines]; // Initialize filteredMedicines with all medicines
            },
            (error) => {
                console.error('Error getting medicine:', error);
            }
        );
    }

    deleteMedicine(medId: number): void {
      if (confirm('Are you sure you want to delete this medicine?')) {
        this.medicineService.deleteMedicine(medId).subscribe(
          () => {
            console.log('Medicine deleted successfully');
            this.fetchMedicines(); // Refresh the list after deletion
          },
          (error) => {
            console.error('Error deleting medicine:', error);
          }
        );
      }
    }

    filterMedicines(): void {
        if (!this.searchQuery) {
            // If the search query is empty, display all medicines
            this.filteredMedicines = [...this.medicines];
        } else {
            // Filter medicines based on the search query
            this.filteredMedicines = this.medicines.filter((medicine) =>
                this.matchSearchQuery(medicine)
            );
        }
    }

    // Check if a medicine matches the search query
    matchSearchQuery(medicine: any): boolean {
        const lowerCaseQuery = this.searchQuery.toLowerCase();
        return (
            medicine.generic_name.toLowerCase().includes(lowerCaseQuery) ||
            medicine.med_name.toLowerCase().includes(lowerCaseQuery)
        );
    }
}
