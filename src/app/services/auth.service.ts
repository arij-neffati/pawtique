import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/user';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      console.log('Loaded user from localStorage:', JSON.parse(userData));
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(userData));
    } else {
      console.log('No user data in localStorage');
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }
  

  // Method to sign in
  signIn(username: string, password: string): Observable<any> {
    const loginData = { email: username, password: password };
    return this.http.post<any>(`${this.apiUrl}/signin`, loginData, { withCredentials: true })
      .pipe(
        map(response => {
          if (response?.status === 'Success' && response.data) {
            this.setCurrentUser(response.data);
          }
          return response;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  // Sign up method
  signUp(name: string, email: string, password: string): Observable<any> {
    const user = { name: name, email: email, password: password };
    return this.http.post<any>(`${this.apiUrl}/signup`, user, { withCredentials: true })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          throw error;
        })
      );
  }

  // Get the current logged-in user as an observable
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();  // Make sure you're returning the observable here
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
    this.http.post<any>('http://localhost:3000/user/logout', {}, { withCredentials: true })
      .subscribe();
  }
}
