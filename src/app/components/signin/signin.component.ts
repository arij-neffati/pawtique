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
  imports: [CommonModule, FormsModule], // Supprimez NgModule ici
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.http.post<any>('http://localhost:27017/api/login', loginData)
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
}
