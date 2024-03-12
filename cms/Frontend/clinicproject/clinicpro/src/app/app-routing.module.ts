import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { RecepApplyAppointmentComponent } from './recep-apply-appointment/recep-apply-appointment.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { PatientCareComponent } from './patientcare/patientcare.component';
import { PatientgivemedComponent } from './patientgivemed/patientgivemed.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { LabcareComponent } from './labcare/labcare.component';
import { LabgivemedComponent } from './labgivemed/labgivemed.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/:staffId', component: AdminComponent },
  { path: 'patient-history/:registerId', component: PatientHistoryComponent },
  { path: 'labcare', component: LabcareComponent },
  { path: 'labgivemed', component:LabgivemedComponent  },
  { path: 'patient-details/:register_id', component: PatientDetailsComponent },

  


  { path: 'doctor/:staffId', component: DoctorComponent },
  { path: 'receptionist/:staffId', component: ReceptionistComponent },
  { path: 'pharmacist/:staffId', component: PharmacistComponent },
  { path: 'labtechnician/:staffId', component: LabtechnicianComponent },
  { path: 'add-staff', component: AddStaffComponent },
  { path: 'add-doctor', component: AdddoctorComponent },
  { path: 'recep-add-patient', component: RecepAddPatientComponent },
  { path: 'recep-book-appointment', component: RecepBookAppointmentComponent },
  { path: 'check-doctor-availability', component: RecepCheckAvailabilityComponent },
  { path: 'recep-apply-appointment/:register_id', component: RecepApplyAppointmentComponent },
  { path: 'diagnosis/:register_id', component: DiagnosisComponent },
  { path: 'medicine', component: AddMedicineComponent },
  { path: 'patientcare', component: PatientCareComponent },
  { path: 'patientgivemed/:register_id', component: PatientgivemedComponent },




  // Add more routes as needed
  // Add more routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
