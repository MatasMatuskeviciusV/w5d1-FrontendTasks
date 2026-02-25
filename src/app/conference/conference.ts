import { Injectable } from '@angular/core';
import { MOCK_SESSIONS, MOCK_TRACKS } from '../mock/mock-data';
import type { SessionRead } from '../models/session.model';
import type { TrackRead } from '../models/track.model';

@Injectable({ providedIn: 'root' })
export class ConferenceService {
  getSessions(): SessionRead[] {
    return MOCK_SESSIONS;
  }

  getTracks(): TrackRead[] {
    return MOCK_TRACKS;
  }
}