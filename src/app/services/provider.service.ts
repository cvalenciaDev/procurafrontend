import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/user.model';

export interface ProviderProfile {
  providerName: string;
  description: string;
  specialty: string;
  services: string;
  experienceYears: number | null;
  city: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  hourlyRate: number | null;
  isAvailable: boolean;
  workersCount: number | null;
  whatsappNumber: string;
  brochureUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private apiUrl = `${environment.apiUrl}/providers`;

  constructor(private http: HttpClient) {}

  create(data: ProviderProfile): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, data);
  }
}
