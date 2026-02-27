import { Component } from '@angular/core';
import { ConferenceContainer } from './conference/conference-container/conference-container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ConferenceContainer],
  templateUrl: './app.html',
})
export class App {}