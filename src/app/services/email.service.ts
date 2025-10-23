import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly baseUrl = 'https://legacy-camp-app-backend-production.up.railway.app';

  constructor(private http: HttpClient) {}

  sendContract(inscricaoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/email/send-contract/${inscricaoId}`, {});
  }

  sendWelcome(inscricaoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/email/send-welcome/${inscricaoId}`, {});
  }

  sendPaymentInstructions(inscricaoId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/email/send-payment-instructions/${inscricaoId}`, {});
  }

  sendCustomEmail(inscricaoId: number, subject: string, message: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/email/send`, {
      inscricaoId: inscricaoId.toString(),
      subject: subject,
      message: message
    });
  }
}


