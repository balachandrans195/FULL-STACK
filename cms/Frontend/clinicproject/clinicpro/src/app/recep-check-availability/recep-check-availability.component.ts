// recep-check-availability.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';
import { Department } from '../shared/department';

@Component({
  selector: 'app-recep-check-availability',
  templateUrl: './recep-check-availability.component.html',
  styleUrls: ['./recep-check-availability.component.scss']
})
export class RecepCheckAvailabilityComponent implements OnInit {
  staffList: any[] = [];
  filteredData: any[] = [];

  constructor(private bookAppointmentService: BookAppointmentService
  ) { }

  ngOnInit(): void {
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
    this.filteredData = [];
    this.filteredData = this.staffList.filter(item => item.role === roleId);
  }
}
