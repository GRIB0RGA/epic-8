import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBodyComponent } from './booking-body.component';

describe('BookingBodyComponent', () => {
  let component: BookingBodyComponent;
  let fixture: ComponentFixture<BookingBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
