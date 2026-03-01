import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ConferenceStoreService } from '../conference-store.service';

@Component({
  selector: 'app-conference-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './conference-container.html',
  styleUrls: ['./conference-container.css'],
})
export class ConferenceContainer {
  private readonly store = inject(ConferenceStoreService);
  readonly uiState = this.store.uiState;
  readonly error = this.store.error;
  readonly isLoading = this.store.isLoading;
  readonly isEmpty = this.store.isEmpty;
}