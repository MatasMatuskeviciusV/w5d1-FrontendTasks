import { Component, inject } from '@angular/core';
import { ConferenceForm } from '../conference-form/conference-form';
import { ConferenceSessionsList } from '../conference-sessions-list/conference-sessions-list';
import { ConferenceStoreService } from '../conference-store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conference-container',
  standalone: true,
  imports: [CommonModule, ConferenceForm, ConferenceSessionsList],
  templateUrl: './conference-container.html',
})
export class ConferenceContainer {
  private readonly store = inject(ConferenceStoreService);
  readonly uiState = this.store.uiState;
  readonly error = this.store.error;
  readonly isLoading = this.store.isLoading;
  readonly isEmpty = this.store.isEmpty;
}