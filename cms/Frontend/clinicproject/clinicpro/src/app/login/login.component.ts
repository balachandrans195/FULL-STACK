// login.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response.role_id);

        // Route to the appropriate page based on the role_id
        this.routeToPage(response.role_id,response.staff_id);
      },
      error => {
        console.error('Login failed:', error);
        alert("Login Failed")
        // Handle login error, e.g., display an error message
      }
    );
  }

  // Define a function to route to the appropriate page based on the role_id
  private routeToPage(roleId: number,staff_id:number) {
    // Define your route mappings or logic based on role_id
    if (roleId === 1) {
      this.router.navigate(['/admin/',staff_id]);
    } else if (roleId === 2) {
      this.router.navigate(['/doctor',staff_id]);
    } else if (roleId === 3) {
      this.router.navigate(['/pharmacist',staff_id]);
    } else if (roleId === 4) {
      this.router.navigate(['/receptionist',staff_id]);
    } else if (roleId === 5) {
      this.router.navigate(['/labtechnician',staff_id]);
    } 
  }
}
