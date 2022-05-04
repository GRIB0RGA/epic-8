import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRequestCardComponent } from './consultation-request-card.component';

describe('ConsultationRequestCardComponent', () => {
  let component: ConsultationRequestCardComponent;
  let fixture: ComponentFixture<ConsultationRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationRequestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
