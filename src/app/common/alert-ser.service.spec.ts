import { TestBed } from '@angular/core/testing';

import { AlertSerService } from './alert-ser.service';

describe('AlertSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertSerService = TestBed.get(AlertSerService);
    expect(service).toBeTruthy();
  });
});
