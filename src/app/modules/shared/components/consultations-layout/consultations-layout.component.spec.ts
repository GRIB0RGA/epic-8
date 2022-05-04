import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationsLayoutComponent } from './consultations-layout.component';

describe('ConsultationsLayoutComponent', () => {
  let component: ConsultationsLayoutComponent;
  let fixture: ComponentFixture<ConsultationsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultationsLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
