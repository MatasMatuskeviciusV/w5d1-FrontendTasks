import { Injectable, computed, signal } from '@angular/core';
import { ConferenceService } from './conference';
import { SessionCreate, SessionRead } from '../models/session.model';
import { TrackRead } from '../models/track.model';

export type ConferenceUiState = 'empty' | 'filled';

const INITIAL_FORM: SessionCreate = {
  title: '',
  abstract: '',
  startTime: '',
  endTime: '',
  trackId: 1,
};

@Injectable({ providedIn: 'root' })
export class ConferenceStoreService {
  private readonly _sessions = signal<SessionRead[]>([]);
  private readonly _tracks = signal<TrackRead[]>([]);
  private readonly _form = signal<SessionCreate>({ ...INITIAL_FORM });

  readonly sessions = this._sessions.asReadonly();
  readonly tracks = this._tracks.asReadonly();
  readonly form = this._form.asReadonly();

  readonly uiState = computed<ConferenceUiState>(() =>
    this._sessions().length === 0 ? 'empty' : 'filled'
  );

  constructor(private readonly data: ConferenceService) {
    const sessions = this.data.getSessions();
    const tracks = this.data.getTracks();

    this._sessions.set(sessions);
    this._tracks.set(tracks);

    const firstTrack = tracks[0];
    if (firstTrack) {
      this._form.update((f) => ({ ...f, trackId: firstTrack.id }));
    }
  }

  patchForm(patch: Partial<SessionCreate>): void {
    this._form.update((prev) => ({ ...prev, ...patch }));
  }

  resetFormKeepTrack(): void {
    const keepTrackId = this._form().trackId;
    this._form.set({ ...INITIAL_FORM, trackId: keepTrackId });
  }

  submitForm(): void {
    const payload = this._form();
    this.addSession(payload);
    this.resetFormKeepTrack();
  }

  deleteSession(id: number): void {
    this._sessions.update((prev) => prev.filter((s) => s.id !== id));
  }

  private addSession(payload: SessionCreate): void {
    const current = this._sessions();

    const nextId = current.reduce((max, s) => (s.id > max ? s.id : max), 0) + 1;
    const track = this._tracks().find((t) => t.id === payload.trackId);

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

    this._sessions.set([newSession, ...current]);
  }
}