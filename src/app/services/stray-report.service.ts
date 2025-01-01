import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StrayReportService {
  private apiUrl = 'http://localhost:3000/report/report';

  constructor(private http: HttpClient) {}

  submitAdoptionForm(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*');  // More permissive Accept header

    console.log('Submitting to:', this.apiUrl);
    console.log('With data:', data);

    return this.http.post(this.apiUrl, data, { 
      headers: headers,
      withCredentials: false // Explicitly disable credentials
    }).pipe(
      tap(response => console.log('Success response:', response)),
      catchError(error => {
        console.error('Error occurred:', error);
        // Re-throw a more user-friendly error
        return throwError(() => new Error('Failed to submit form. Please try again.'));
      })
    );
  }
}