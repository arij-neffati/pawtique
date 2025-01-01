import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user'; 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    // Initialize currentUserSubject with data from localStorage if available
    const userData = localStorage.getItem('userData');
    this.currentUserSubject = new BehaviorSubject<any>(userData ? JSON.parse(userData) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Method to sign in
  signIn(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, credentials);
  }

  // Method to sign up
  signUp(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // Get the current logged-in user as an observable
  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  // Set the current user in localStorage and BehaviorSubject
  setCurrentUser(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Logout the user, clear from localStorage and BehaviorSubject
  logout(): void {
    localStorage.removeItem('userData');
    this.currentUserSubject.next(null);
  }
}
