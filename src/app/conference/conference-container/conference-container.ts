import { Component, inject } from '@angular/core';
import { ConferenceForm } from '../conference-form/conference-form';
import { ConferenceSessionsList } from '../conference-sessions-list/conference-sessions-list';
import { ConferenceStoreService } from '../conference-store.service';

@Component({
  selector: 'app-conference-container',
  standalone: true,
  imports: [ConferenceForm, ConferenceSessionsList],
  templateUrl: './conference-container.html',
})
export class ConferenceContainer {
  private readonly store = inject(ConferenceStoreService);
  readonly uiState = this.store.uiState;
}