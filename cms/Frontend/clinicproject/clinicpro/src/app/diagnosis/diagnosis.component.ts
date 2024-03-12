import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookAppointmentService } from '../book-appointment.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  receptionistForm: any = {};
  dobError: boolean = false;
  emailError: string = '';
  weightError: boolean = false;
  heightError: boolean = false;
  ageError: boolean = false;

  Diagnosis: any = {
    diagnosis_id: ":",
    diagnosis: "",
    Medicine_prefered: "",
    Take_test: " ",
    notes: "  ",
    register_id: ""
  };

  constructor(private route: ActivatedRoute, private bookservice: BookAppointmentService , private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const registerId = params['register_id'];
      this.Diagnosis.register_id = registerId;
    });
  }
  logout() {
    
    this.router.navigate(['/login']);
  }

  onSubmit() {
    console.log(this.Diagnosis);
    this.bookservice.postDiagnosis(this.Diagnosis).subscribe(
      response => {
        console.log('Diagnosis submitted successfully:', response);
        alert("Diagnosis submitted successfully")
      },
      error => {
        console.error('Error submitting diagnosis:', error);
        alert("Error submitting diagnosis")
      }
    );
  }

  
}
