import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { TrackRead } from '../../models/track.model';
import type { SessionCreate } from '../../models/session.model';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conference-form.html',
  styleUrl: './conference-form.css',
})
export class ConferenceForm {
  @Input() tracks: TrackRead[] = [];
  @Output() createSession = new EventEmitter<SessionCreate>();

  model: SessionCreate = {
    title: '',
    abstract: '',
    startTime: '',
    endTime: '',
    trackId: 1,
  };

  submit(isValid: boolean): void {
    if (!isValid) return;

    this.createSession.emit({ ...this.model });

    this.model = {
      title: '',
      abstract: '',
      startTime: '',
      endTime: '',
      trackId: this.model.trackId,
    };
  }
}