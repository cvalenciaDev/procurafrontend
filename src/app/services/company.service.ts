import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/user.model';

export interface CompanyProfile {
  companyName: string;
  description: string;
  industry: string;
  city: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  employeesCount: number | null;
  foundedYear: number | null;
  taxId: string;
  website: string;
  address: string;
  logo: string;
  specialty: string;
  internationalPresence: string;
  completedProjects: string;
  fiscalAddress: string;
  maxCapacity: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) {}

  create(data: CompanyProfile): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(this.apiUrl, data);
  }
}
