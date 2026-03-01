import { Routes } from '@angular/router';
import { sessionExistsGuard } from './conference/guards/session-exists.guard';
import { ConferenceContainer } from './conference/conference-container/conference-container';
import { ConferenceSessionsList } from './conference/conference-sessions-list/conference-sessions-list';
import { ConferenceForm } from './conference/conference-form/conference-form';

export const routes: Routes = [
  {
    path: '',
    component: ConferenceContainer,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'sessions' },

      { path: 'sessions', component: ConferenceSessionsList },
      { path: 'sessions/new', component: ConferenceForm },

      {
        path: 'sessions/:id',
        component: ConferenceForm,
        canActivate: [sessionExistsGuard]
      },
    ],
  },

  { path: '**', redirectTo: 'sessions' },
];