import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingConsultationsComponent } from './upcoming-consultations.component';

describe('UpcomingConsultationsComponent', () => {
  let component: UpcomingConsultationsComponent;
  let fixture: ComponentFixture<UpcomingConsultationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingConsultationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingConsultationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
