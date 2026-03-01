import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ConferenceStoreService } from '../conference-store.service';
import { HighlightOnHover } from '../highlight-on-hover/highlight-on-hover';
import { SortSessionsByStartPipe } from '../pipes/sort-sessions-by-start.pipe';

@Component({
  selector: 'app-conference-sessions-list',
  standalone: true,
  imports: [RouterLink, HighlightOnHover, SortSessionsByStartPipe],
  templateUrl: './conference-sessions-list.html',
  styleUrls: ['./conference-sessions-list.css'],
})
export class ConferenceSessionsList {
  private readonly store = inject(ConferenceStoreService);

  readonly sessions = this.store.sessions;

  deleteSession(id: number): void {
    this.store.deleteSession(id);
  }
}