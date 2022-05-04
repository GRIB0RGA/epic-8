import { TestBed } from '@angular/core/testing';
import { PasswordUIService } from './password-ui.service';

describe('PasswordToggleService', () => {
  let service: PasswordUIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordUIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
