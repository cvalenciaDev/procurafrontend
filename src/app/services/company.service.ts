import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/user.model';

export interface GalleryItem {
  id?: number;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  title?: string;
  description?: string;
}

export interface CompanyProfile {
  id?: number;
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
  brochureUrl?: string;
  coverImageUrl?: string;
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

  getMyProfile(): Observable<ApiResponse<CompanyProfile>> {
    return this.http.get<ApiResponse<CompanyProfile>>(`${this.apiUrl}/my`);
  }

  updateMyProfile(data: Partial<CompanyProfile>): Observable<ApiResponse<CompanyProfile>> {
    return this.http.put<ApiResponse<CompanyProfile>>(`${this.apiUrl}/profile`, data);
  }

  getAll(): Observable<ApiResponse<CompanyProfile[]>> {
    return this.http.get<ApiResponse<CompanyProfile[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<CompanyProfile>> {
    return this.http.get<ApiResponse<CompanyProfile>>(`${this.apiUrl}/${id}`);
  }

  getGallery(id: number): Observable<ApiResponse<GalleryItem[]>> {
    return this.http.get<ApiResponse<GalleryItem[]>>(`${this.apiUrl}/${id}/gallery`);
  }

  addGalleryItem(id: number, item: Omit<GalleryItem, 'id'>): Observable<ApiResponse<GalleryItem>> {
    return this.http.post<ApiResponse<GalleryItem>>(`${this.apiUrl}/${id}/gallery`, item);
  }

  deleteGalleryItem(companyId: number, mediaId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${companyId}/gallery/${mediaId}`);
  }
}
