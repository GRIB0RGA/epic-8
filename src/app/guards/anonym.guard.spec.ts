import { TestBed } from '@angular/core/testing';

import { AnonymGuard } from './anonym.guard';

describe('AnonymGuard', () => {
  let guard: AnonymGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonymGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
