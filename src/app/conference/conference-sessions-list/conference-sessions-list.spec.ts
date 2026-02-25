import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceSessionsList } from './conference-sessions-list';

describe('ConferenceSessionsList', () => {
  let component: ConferenceSessionsList;
  let fixture: ComponentFixture<ConferenceSessionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceSessionsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceSessionsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
