import { Injectable, computed, signal } from '@angular/core';
import { ConferenceService } from './conference';
import { SessionCreate, SessionRead } from '../models/session.model';
import { TrackRead } from '../models/track.model';
import { Observable, tap } from 'rxjs';

const STATIC_TRACKS: TrackRead[] = [
  { id: 1, name: 'Backend Development' },
  { id: 2, name: 'Frontend Development' },
  { id: 3, name: 'Cloud & DevOps' },
  { id: 4, name: 'Mobile Development' },
  { id: 5, name: 'Data & AI' },
];

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
  private readonly _tracks = signal<TrackRead[]>(STATIC_TRACKS);
  private readonly _form = signal<SessionCreate>({ ...INITIAL_FORM });

  private readonly _error = signal<string>('');
  private readonly _isLoading = signal(false);

  readonly sessions = this._sessions.asReadonly();
  readonly tracks = this._tracks.asReadonly();
  readonly form = this._form.asReadonly();
  readonly error = this._error.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly isEmpty = computed(() => 
    !this._isLoading() && this._sessions().length === 0
  );

  readonly uiState = computed<ConferenceUiState>(() =>
    this._sessions().length === 0 ? 'empty' : 'filled'
  );

  private setError(msg: string) {
    this._error.set(msg);
    setTimeout(() => this._error.set(''), 5000);
  }

  constructor(private readonly data: ConferenceService) {

    const sessions = this.data.getSessions();

    this._sessions.set(sessions);

    this._isLoading.set(true);

    this.data.fetchSessions().subscribe({
      next: (remote) => {
        this._sessions.set(remote);
        this._isLoading.set(false);
      },
      error: (err) => {
        const msg = 'Failed to load sessions';
        console.error(msg, err);
        this.setError(`${msg}: ${err.message || err}`);
        this._isLoading.set(false);
      },
    });

  }

  createSession(payload: SessionCreate): Observable<SessionRead> {
    return this.data.createSession(payload).pipe(
      tap((newSession) => {
        const trackFromResponse = newSession.track;
        const needsReplacement =
          !trackFromResponse || !trackFromResponse.name ||
          trackFromResponse.id !== newSession.trackId;
        if (needsReplacement) {
          const track = this._tracks().find((t) => t.id === newSession.trackId);
          if (track) {
            newSession = { ...newSession, track };
          }
        }

        this._sessions.update((prev) => [newSession, ...prev]);
      })
    );
  }

  deleteSession(id: number): void {
    this._sessions.update((prev) => prev.filter((s) => s.id !== id));

    this.data.deleteSession(id).subscribe({
      error: (err) => {
        const msg = 'Failed to delete session';
        console.error(msg, err);
        this.setError(`${msg}: ${err.message || err}`);
        this.data.fetchSessions().subscribe({
          next: (remote) => this._sessions.set(remote),
        });
      },
    });
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

  private _deleteSessionLocally(id: number): void {
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