import { Injectable, computed, signal } from '@angular/core';
import { ConferenceService } from './conference';
import { SessionCreate, SessionRead} from '../models/session.model';
import { TrackRead } from '../models/track.model';
import { Observable, tap } from 'rxjs';

export type ConferenceUiState = 'empty' | 'filled';

@Injectable({ providedIn: 'root' })
export class ConferenceStoreService {
  private readonly _sessions = signal<SessionRead[]>([]);
  private readonly _tracks = signal<TrackRead[]>([]);

  private readonly _error = signal<string>('');
  private readonly _isLoading = signal(false);

  readonly sessions = this._sessions.asReadonly();
  readonly tracks = this._tracks.asReadonly();
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

    this._tracks.set(this.data.getTracks());

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

  updateSession(id: number, payload: SessionCreate): Observable<SessionRead> {
    return this.data.updateSession(id, payload).pipe(
      tap((updated) => {
        const trackFromResponse = updated.track;
        const needsReplacement =
          !trackFromResponse || !trackFromResponse.name ||
          trackFromResponse.id !== updated.trackId;

        if (needsReplacement) {
          const track = this._tracks().find((t) => t.id === updated.trackId);
          if (track) updated = { ...updated, track };
        }

        this._sessions.update((prev) =>
          prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
        );
      })
    );
  }
  
  getSessionById(id: number): SessionRead | undefined {
    return this._sessions().find((s) => s.id === id);
  }
}