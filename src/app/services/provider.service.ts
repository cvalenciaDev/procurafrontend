import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/user.model';

export interface ProviderProfile {
  id?: number;
  userId?: number;
  providerName: string;
  description: string;
  specialty: string;
  services: string;
  experienceYears: number | null;
  certifications?: string;
  rating?: number;
  totalReviews?: number;
  logo?: string;
  website?: string;
  address?: string;
  city: string;
  country: string;
  contactEmail: string;
  contactPhone: string;
  hourlyRate: number | null;
  isAvailable: boolean;
  brochureUrl: string;
  whatsappNumber: string;
  workersCount: number | null;
  applicationsCount?: number;
  clientsList?: string;
  associatedCompanyIds?: string;
  coverImageUrl?: string;
}

export interface GalleryItem {
  id?: number;
  type: 'IMAGE' | 'VIDEO';
  url: string;
  title?: string;
  description?: string;
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

  getAll(): Observable<ApiResponse<ProviderProfile[]>> {
    return this.http.get<ApiResponse<ProviderProfile[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<ProviderProfile>> {
    return this.http.get<ApiResponse<ProviderProfile>>(`${this.apiUrl}/${id}`);
  }

  getMyProfile(): Observable<ApiResponse<ProviderProfile>> {
    return this.http.get<ApiResponse<ProviderProfile>>(`${this.apiUrl}/my`);
  }

  updateMyProfile(data: Partial<ProviderProfile>): Observable<ApiResponse<ProviderProfile>> {
    return this.http.put<ApiResponse<ProviderProfile>>(`${this.apiUrl}/profile`, data);
  }

  getGallery(id: number): Observable<ApiResponse<GalleryItem[]>> {
    return this.http.get<ApiResponse<GalleryItem[]>>(`${this.apiUrl}/${id}/gallery`);
  }

  addGalleryItem(id: number, item: Omit<GalleryItem, 'id'>): Observable<ApiResponse<GalleryItem>> {
    return this.http.post<ApiResponse<GalleryItem>>(`${this.apiUrl}/${id}/gallery`, item);
  }

  deleteGalleryItem(providerId: number, mediaId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/${providerId}/gallery/${mediaId}`);
  }
}
