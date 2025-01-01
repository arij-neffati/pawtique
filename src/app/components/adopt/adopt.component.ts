//adopt component ts 
import { Component } from '@angular/core';
import { AdoptionService } from '../../services/adoption.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './adopt.component.html',
  styleUrls: ['./adopt.component.css']
})
export class AdoptComponent {
  name: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private adoptionService: AdoptionService,
    private router: Router
  ) {}

  handleSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    console.log('Starting form submission...');

    const formData = {
      name: this.name,
      Lname: this.lastName,
      email: this.email,
      phone: this.phone,
      address: this.address
    };

    this.adoptionService.submitAdoptionForm(formData).subscribe({
      next: (response) => {
        console.log('Submission successful:', response);
        alert('Thank you for your adoption request! We will contact you soon.');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Submission failed:', error);
        alert(`Error: ${error.message || 'Unknown error occurred'}`);
        this.isSubmitting = false;
      },
      complete: () => {
        console.log('Submission complete');
        this.isSubmitting = false;
      }
    });
  }
}