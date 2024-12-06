/*import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

}*/
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importation de HttpClient
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [],
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
          this.router.navigate(['/dashboard']);  // Redirection vers le tableau de bord
        }
      });
  }
}
