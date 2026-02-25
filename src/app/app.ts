import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MOCK_SESSIONS } from './mock/mock-data';
import type { SessionCreate, SessionRead } from './models/session.model';
import type { UiState } from './ui/ui-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
})
export class App {
  sessionsState: UiState<SessionRead[]> = {
    status: 'ready',
    data: MOCK_SESSIONS
  };

  newSession: SessionCreate = {
    title: '',
    abstract: '',
    startTime: '',
    endTime: '',
    trackId: 1
  };

  submittedData: SessionCreate | null = null;

  onSubmit() {
    this.submittedData = {...this.newSession};
  }
}