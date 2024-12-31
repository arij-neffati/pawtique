import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule], // Keep your imports here
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // Sign In fields
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Sign-Up fields
  isSignUp: boolean = false; // Toggle between Sign In and Sign Up
  name: string = '';
  email: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = ''; // Changed to string to work with input[type="date"]
  agreeTerms: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

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
  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:3000/user/login', loginData)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'Erreur de connexion.';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          alert('Connexion réussie !');
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  // Handle Sign Up
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
      dateOfBirth: this.dateOfBirth // Send date as a string, which matches input[type="date"]
    };

    this.http.post<any>('http://localhost:3000/user/signup', user)
      .pipe(
        catchError(error => {
          this.errorMessage = error.error?.message || 'An error occurred during sign-up.';
          return of(null);
        })
      )
      .subscribe(response => {
        if (response && response.status === "Pending") {
          alert('Please check your email to verify your account!');
          this.toggleForm(); // Switch to Sign In after successful sign-up
        } else {
          this.errorMessage = response?.message || 'An error occurred during sign-up.';
        }
      });
  }
}
