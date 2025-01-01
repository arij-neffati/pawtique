//adoption service 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'http://localhost:3000/report/adopt';

  constructor(private http: HttpClient) {
    // Test connection on service initialization
    this.testConnection();
  }

  private testConnection() {
    console.log('Testing server connection...');
    this.http.options(this.apiUrl).subscribe({
      next: () => console.log('Server is accessible'),
      error: (error) => console.error('Server connection test failed:', error)
    });
  }

  submitAdoptionForm(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
  
    return this.http.post(this.apiUrl, data, { headers }).pipe(
      tap((response) => console.log('Server response:', response)),
      catchError((error) => {
        console.error('Request failed:', error);
  
        if (error.status === 0) {
          // Network error or server is not responding
          return throwError(() => new Error('Network error - Server is not responding. Please check if the server is running'));
        }
  
        return throwError(() => error.error?.message || error.message || 'Server error');
      })
    );
  }
}