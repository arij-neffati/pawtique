import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-foundstray',
  standalone: true,
  imports: [FormsModule], // Add FormsModule to the imports array
  templateUrl: './foundstray.component.html',
  styleUrls: ['./foundstray.component.css']
})
export class FoundstrayComponent {
  name: string = '';
  Lname: string = '';
  email: string = '';
  number: string = '';
  address: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const formData = {
      name: this.name,
      Lname: this.Lname,
      email: this.email,
      number: this.number,
      address: this.address,
    };
  
    this.http.post('http://localhost:3000/report/report', formData).subscribe({
      next: (response) => {
        console.log('Success:', response);
      },
      error: (error) => {
        console.error('HTTP Error:', error);
        alert('Failed to submit the report. Please try again.');
      },
    });
    
  }
  
}
