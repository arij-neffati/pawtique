import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api/orders'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to create an order
  createOrder(order: any, uniqueString: string): Observable<any> {
    const headers = new HttpHeaders().set('uniqueString', uniqueString); // Attach uniqueString for user verification

    return this.http.post(this.apiUrl, order, { headers: headers });
  }

  // Method to get all orders for a user
  getOrders(uniqueString: string): Observable<any[]> {
    const headers = new HttpHeaders().set('uniqueString', uniqueString);
    return this.http.get<any[]>(this.apiUrl, { headers: headers });
  }
}
