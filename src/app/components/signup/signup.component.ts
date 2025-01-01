import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  // Form fields
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  agreeTerms: boolean = false;
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(event: Event) {
    event.preventDefault();
    
    // Basic validation
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the terms of service';
      return;
    }

    // Call the auth service to sign up
    this.authService.signUp(this.name, this.email, this.password)
      .subscribe({
        next: (response) => {
          if (response?.status === "Pending") {
            alert('Please check your email to verify your account!');
            this.router.navigate(['/signin']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Sign up failed';
        }
      });
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }
}