import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { PharmacistComponent } from './pharmacist/pharmacist.component';
import { LabtechnicianComponent } from './labtechnician/labtechnician.component';
import { AdddoctorComponent } from './adddoctor/adddoctor.component';
import { AddStaffComponent } from './addstaff/addstaff.component';
import { RecepAddPatientComponent } from './recep-add-patient/recep-add-patient.component';
import { RecepBookAppointmentComponent } from './recep-book-appointment/recep-book-appointment.component';
import { RecepCheckAvailabilityComponent } from './recep-check-availability/recep-check-availability.component';
import { ValidationDirective } from './Directives/validation.directive';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RecepApplyAppointmentComponent } from './recep-apply-appointment/recep-apply-appointment.component';
import { ToastrModule } from 'ngx-toastr';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { DateFilterPipe, DepartmentNamePipe } from './Pipes/data-filter.pipe';
import { StaffService } from './staff.service';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { RouterModule } from '@angular/router';
import { BookAppointmentService } from './book-appointment.service';
import { PatientCareComponent } from './patientcare/patientcare.component';
import { PatientgivemedComponent } from './patientgivemed/patientgivemed.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { LabcareComponent } from './labcare/labcare.component';
import { LabgivemedComponent } from './labgivemed/labgivemed.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    DoctorComponent,
    PatientCareComponent,
    ReceptionistComponent,
    PharmacistComponent,
    LabtechnicianComponent,
    AddStaffComponent,
    AdddoctorComponent,
    RecepAddPatientComponent,
    RecepBookAppointmentComponent,
    RecepCheckAvailabilityComponent,
    ValidationDirective,
    RecepApplyAppointmentComponent,
    DiagnosisComponent,
    DepartmentNamePipe,
    AddMedicineComponent,
    DateFilterPipe,
    PatientgivemedComponent,
    PatientHistoryComponent,
    LabcareComponent,
    LabgivemedComponent,
    PatientDetailsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    StaffService,
    BookAppointmentService,
    provideAnimationsAsync(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
