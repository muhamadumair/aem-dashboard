import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://test-demo.aemenersol.com/api/account/login';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('bearer_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('bearer_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('bearer_token');
  }
}