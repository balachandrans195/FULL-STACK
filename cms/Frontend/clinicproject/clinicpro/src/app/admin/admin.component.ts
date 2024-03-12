// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StaffService } from '../staff.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

interface StaffData {
  staff_id: number;
  staff_name: string;
  phno: string;
  address: string;
  dob: Date;
  qualification: string;
  salary: number;
  doj: Date;
  status: string;
  department: any;
  email: string;
  role: any;
  gender: string;
  blood_group: string;
  password: string;
  Duty_time: string;
  consultation_fee: number;
  isEditing?: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  staffList: StaffData[] = [];
  staffListFiltered: StaffData[] = [];
  searchTerm$ = new Subject<string>();
  searchForm: FormGroup;

  constructor(private staffService: StaffService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadStaffList();

    this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.searchStaff(value.search))
      )
      .subscribe((filteredStaffList) => {
        this.staffListFiltered = filteredStaffList;
      });
  }

  loadStaffList(): void {
    this.staffService.getstaff().subscribe((data: StaffData[]) => {
      this.staffList = data.map((staff) => ({ ...staff, isEditing: false }));
      this.staffListFiltered = this.staffList;
    });
  }

  startEditing(staff: StaffData): void {
    staff.isEditing = true;
  }

  saveChanges(staff: StaffData): void {
    this.staffService.updateStaffDetails(staff).subscribe(
      (response) => {
        console.log('Staff details updated successfully:', response);
        staff.isEditing = false;
      },
      (error) => {
        console.error('Error updating staff details:', error);
      }
    );
  }

  searchStaff(term: string): Observable<StaffData[]> {
    term = term.toLowerCase();
    return new Observable((observer) => {
      const filteredStaffList = this.staffList.filter(
        (staff) =>
          staff.staff_name.toLowerCase().includes(term) ||
          staff.phno.includes(term) ||
          staff.dob.toString().includes(term)
      );
      observer.next(filteredStaffList);
    });
  }
}
