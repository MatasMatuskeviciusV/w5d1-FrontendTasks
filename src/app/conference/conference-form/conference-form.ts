import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConferenceStoreService } from '../conference-store.service';
import { SessionCreate } from '../../models/session.model';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './conference-form.html',
})
export class ConferenceForm {
  private readonly store = inject(ConferenceStoreService);

  readonly form = this.store.form;
  readonly tracks = this.store.tracks;

  update<K extends keyof SessionCreate>(key: K, value: SessionCreate[K]): void {
    this.store.patchForm({ [key]: value } as Partial<SessionCreate>);
  }

  updateTrackId(raw: unknown): void {
    const trackId = Number(raw);
    this.store.patchForm({ trackId });
  }

  submit(isValid: boolean): void {
    if (!isValid) return;
    this.store.submitForm();
  }
}