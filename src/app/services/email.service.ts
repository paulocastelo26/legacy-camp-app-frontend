import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly baseUrl = 'https://legacy-camp-app-backend-production.up.railway.app';
  private readonly paymentInstructionsUrl = `${this.baseUrl}/email/payment-instructions`;
  private readonly contractUrl = `${this.baseUrl}/email/contract`;

  constructor(private http: HttpClient) {}

  sendPaymentInstructions(inscricaoId: number): Observable<any> {
    return this.http.post<any>(this.paymentInstructionsUrl, { inscricaoId: inscricaoId.toString() });
  }

  sendContract(inscricaoId: number): Observable<any> {
    return this.http.post<any>(this.contractUrl, { inscricaoId: inscricaoId.toString() });
  }
}


