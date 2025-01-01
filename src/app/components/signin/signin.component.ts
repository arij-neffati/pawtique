import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isSignUp: boolean = false;
  
  // Sign-up fields
  name: string = '';
  email: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = '';
  agreeTerms: boolean = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService // Injecter AuthService
  ) {}

  // Toggle between Sign In and Sign Up
  toggleForm() {
    this.isSignUp = !this.isSignUp;
    if (!this.isSignUp) {
      // Reset the sign-up fields when switching back to sign-in
      this.name = '';
      this.email = '';
      this.confirmPassword = '';
      this.dateOfBirth = '';
      this.agreeTerms = false;
    }
  }

  // Handle Sign In
  handleSubmit() {
    const loginData = {
      email: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:3000/user/signin', loginData)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Connection error';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response?.status === "Success") {
          // Set user data in AuthService and navigate
          this.authService.setCurrentUser(response.data);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response?.message || 'Sign in failed';
        }
      });
  }

  
  onSignUpSubmit() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'You must agree to the terms and conditions!';
      return;
    }

    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      dateOfBirth: this.dateOfBirth
    };

    this.http.post<any>('http://localhost:3000/user/signup', user)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Sign up failed';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response?.status === "Pending") {
          alert('Please check your email to verify your account!');
          this.toggleForm();  // Switch to Sign In after successful sign-up
        } else {
          this.errorMessage = response?.message || 'An error occurred during sign-up';
        }
      });
  }
}
