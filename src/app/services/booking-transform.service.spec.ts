import { TestBed } from '@angular/core/testing';

import { BookingTransformService } from './booking-transform.service';

describe('BookingTransformService', () => {
  let service: BookingTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
