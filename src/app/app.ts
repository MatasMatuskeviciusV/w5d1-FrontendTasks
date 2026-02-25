import { Component } from '@angular/core';
import { ConferenceContainer } from './conference/conference-container/conference-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConferenceContainer],
  templateUrl: './app.html',
})
export class App {}

// import { Component } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { MOCK_SESSIONS } from './mock/mock-data';
// import type { SessionCreate, SessionRead } from './models/session.model';
// import type { UiState } from './ui/ui-state';
// import { ConferenceContainer } from "./conference/conference-container/conference-container";

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [FormsModule, ConferenceContainer],
//   templateUrl: './app.html',
// })
// export class App {
//   sessionsState: UiState<SessionRead[]> = {
//     status: 'ready',
//     data: MOCK_SESSIONS
//   };

//   newSession: SessionCreate = {
//     title: '',
//     abstract: '',
//     startTime: '',
//     endTime: '',
//     trackId: 1
//   };

//   submittedData: SessionCreate | null = null;

//   onSubmit() {
//     this.submittedData = {...this.newSession};
//   }
// }