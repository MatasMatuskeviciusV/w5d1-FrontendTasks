import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const API_ENDPOINTS = {
  conferences: '/api/conferences',
  sessions: '/api/sessions',
  tracks: '/api/tracks',
  speakers: '/api/speakers',
  attendees: '/api/attendees',
};

@Injectable({ providedIn: 'root' })
export class ApiService {

  readonly baseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams) {
    return this.http.get<T>(this.buildUrl(endpoint), { params });
  }

  post<T>(endpoint: string, body: unknown) {
    return this.http.post<T>(this.buildUrl(endpoint), body);
  }

  put<T>(endpoint: string, body: unknown) {
    return this.http.put<T>(this.buildUrl(endpoint), body);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(this.buildUrl(endpoint));
  }

  private buildUrl(endpoint: string): string {
    const cleanedBase = this.baseUrl.replace(/\/$$/, '');
    const cleanedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${cleanedBase}${cleanedEndpoint}`;
  }
}
