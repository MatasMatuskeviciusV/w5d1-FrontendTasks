import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceForm } from '../conference-form/conference-form';
import { ConferenceSessionsList } from '../conference-sessions-list/conference-sessions-list';
import { ConferenceService } from '../conference';
import type { SessionCreate, SessionRead } from '../../models/session.model';
import type { TrackRead } from '../../models/track.model';

@Component({
  selector: 'app-conference-container',
  standalone: true,
  imports: [CommonModule, ConferenceForm, ConferenceSessionsList],
  templateUrl: './conference-container.html',
  styleUrl: './conference-container.css',
})
export class ConferenceContainer {
  sessions: SessionRead[] = [];
  tracks: TrackRead[] = [];

  constructor(private readonly conferenceService: ConferenceService) {
    this.sessions = this.conferenceService.getSessions();
    this.tracks = this.conferenceService.getTracks();
  }

  handleCreateSession(payload: SessionCreate): void {
    const nextId =
      this.sessions.length > 0 ? Math.max(...this.sessions.map(s => s.id)) + 1 : 1;

    const track = this.tracks.find(t => t.id === payload.trackId);

    const newSession: SessionRead = {
      id: nextId,
      title: payload.title,
      abstract: payload.abstract,
      startTime: payload.startTime,
      endTime: payload.endTime,
      trackId: payload.trackId,
      track: track ? { id: track.id, name: track.name } : undefined,
      speakers: [],
    };

    this.sessions = [newSession, ...this.sessions];
  }

  handleDeleteSession(sessionId: number): void {
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
  }
}