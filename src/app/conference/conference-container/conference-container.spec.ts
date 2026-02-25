import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceContainer } from './conference-container';

describe('ConferenceContainer', () => {
  let component: ConferenceContainer;
  let fixture: ComponentFixture<ConferenceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
