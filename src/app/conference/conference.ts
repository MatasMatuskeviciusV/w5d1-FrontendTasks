import { Injectable } from '@angular/core';
import { MOCK_SESSIONS, MOCK_TRACKS } from '../mock/mock-data';
import type { SessionRead, SessionCreate } from '../models/session.model';
import type { TrackRead } from '../models/track.model';
import { ApiService, API_ENDPOINTS } from '../services/api.service';
import { Observable } from 'rxjs';

const STATIC_TRACKS: TrackRead[] = [
  { id: 1, name: 'Backend Development' },
  { id: 2, name: 'Frontend Development' },
  { id: 3, name: 'Cloud & DevOps' },
  { id: 4, name: 'Mobile Development' },
  { id: 5, name: 'Data & AI' },
];

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  constructor(private readonly api: ApiService) {}

  getSessions(): SessionRead[] {
    return MOCK_SESSIONS;
  }

  getMockTracks(): TrackRead[] {
    return MOCK_TRACKS;
  }

  fetchSessions(): Observable<SessionRead[]> {
    return this.api.get<SessionRead[]>(API_ENDPOINTS.sessions);
  }

  fetchTracks(): Observable<TrackRead[]> {
    return this.api.get<TrackRead[]>(API_ENDPOINTS.tracks);
  }

  createSession(payload: SessionCreate): Observable<SessionRead> {
    const normalized = { ...payload, trackId: Number(payload.trackId) } as SessionCreate;
    return this.api.post<SessionRead>(API_ENDPOINTS.sessions, normalized);
  }

  deleteSession(id: number): Observable<void> {
    return this.api.delete<void>(`${API_ENDPOINTS.sessions}/${id}`);
  }

  updateSession(id: number, payload: SessionCreate): Observable<SessionRead> {
    const normalized = { ...payload, trackId: Number(payload.trackId) } as SessionCreate;
    return this.api.put<SessionRead>(`${API_ENDPOINTS.sessions}/${id}`, normalized);
  }

  getTracks(): TrackRead[]{
    return STATIC_TRACKS;
  }
}