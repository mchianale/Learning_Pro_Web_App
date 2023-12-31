import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  constructor() {}
  // Save token to storage
  setAuthToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  // Get token from storage
  getAuthToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Clear token from storage (logout)
  clearAuthToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
  isAuthenticated(): boolean {

    const token = localStorage.getItem('auth_token');
    return token !== '' && token !== null;
  }

}
