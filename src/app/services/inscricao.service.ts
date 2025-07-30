import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Inscricao {
  id?: number;
  fullName: string;
  birthDate: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  socialMedia: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  isLagoinhaMember: string;
  churchName: string;
  ministryParticipation: string;
  registrationLot: string;
  paymentMethod: string;
  paymentProof?: string;
  shirtSize: string;
  hasAllergy: string;
  allergyDetails?: string;
  usesMedication?: string;
  medicationDetails?: string;
  dietaryRestriction: string;
  hasMinistryTest: string;
  ministryTestResults?: string;
  prayerRequest: string;
  imageAuthorization: boolean;
  analysisAwareness: boolean;
  termsAwareness: boolean;
  truthDeclaration: boolean;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class InscricaoService {
  private apiUrl = 'http://localhost:3000/inscricoes';

  constructor(private http: HttpClient) { }

  criarInscricao(inscricao: Inscricao): Observable<Inscricao> {
    return this.http.post<Inscricao>(this.apiUrl, inscricao);
  }

  listarInscricoes(): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(this.apiUrl);
  }

  buscarInscricao(id: number): Observable<Inscricao> {
    return this.http.get<Inscricao>(`${this.apiUrl}/${id}`);
  }

  atualizarInscricao(id: number, inscricao: Partial<Inscricao>): Observable<Inscricao> {
    return this.http.patch<Inscricao>(`${this.apiUrl}/${id}`, inscricao);
  }

  removerInscricao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarStatus(id: number, status: string): Observable<Inscricao> {
    return this.http.patch<Inscricao>(`${this.apiUrl}/${id}/status`, { status });
  }

  listarPorStatus(status: string): Observable<Inscricao[]> {
    return this.http.get<Inscricao[]>(`${this.apiUrl}/status/${status}`);
  }

  obterEstatisticas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
} 