import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRequestsComponent } from './consultation-requests.component';

describe('ConsultationRequestsComponent', () => {
  let component: ConsultationRequestsComponent;
  let fixture: ComponentFixture<ConsultationRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
