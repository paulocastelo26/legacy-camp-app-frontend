import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Credenciais mockadas
  private readonly MOCK_USERNAME = 'admin';
  private readonly MOCK_PASSWORD = 'legacy@2025';

  constructor() {
    // Verificar se já está logado (localStorage)
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    this.isAuthenticatedSubject.next(isLoggedIn);
  }

  login(username: string, password: string): boolean {
    if (username === this.MOCK_USERNAME && password === this.MOCK_PASSWORD) {
      localStorage.setItem('adminLoggedIn', 'true');
      this.isAuthenticatedSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('adminLoggedIn');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
