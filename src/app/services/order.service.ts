import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders';  // Update with your actual API URL

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, orderData, { 
      headers,
      withCredentials: true  // Ensure cookies are sent along with the request
    }).pipe(
      catchError(error => {
        console.error('Error during order creation:', error);
        console.error('Backend response:', error.error);

        const errorMessage = error.error?.message || 'Order creation failed. Please try again.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
