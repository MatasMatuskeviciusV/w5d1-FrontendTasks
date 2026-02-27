import { Component, inject } from '@angular/core';
import { ConferenceStoreService } from '../conference-store.service';
import { HighlightOnHover } from '../highlight-on-hover/highlight-on-hover';
import { SortSessionsByStartPipe } from '../pipes/sort-sessions-by-start.pipe';

@Component({
  selector: 'app-conference-sessions-list',
  standalone: true,
  imports: [HighlightOnHover, SortSessionsByStartPipe],
  templateUrl: './conference-sessions-list.html',
})
export class ConferenceSessionsList {
  private readonly store = inject(ConferenceStoreService);

  readonly sessions = this.store.sessions;

  deleteSession(id: number): void {
    this.store.deleteSession(id);
  }
}