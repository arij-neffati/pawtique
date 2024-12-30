// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';  // API endpoint for products

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<any[]> {
    console.log('Fetching products from:', this.apiUrl);  // Debug log to check the URL
    return this.http.get<any[]>(this.apiUrl);  // Returns an observable of products
  }
}
