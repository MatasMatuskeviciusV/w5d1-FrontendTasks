import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightOnHover } from '../highlight-on-hover/highlight-on-hover';

import type { SessionRead } from '../../models/session.model';

@Component({
  selector: 'app-conference-sessions-list',
  standalone: true,
  imports: [CommonModule, HighlightOnHover],
  templateUrl: './conference-sessions-list.html',
  styleUrl: './conference-sessions-list.css',
})
export class ConferenceSessionsList {
  @Input() sessions: SessionRead[] = [];
  @Output() deleteSession = new EventEmitter<number>();
}