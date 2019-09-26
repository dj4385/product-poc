import { TestBed } from '@angular/core/testing';

import { CommonSerService } from './common-ser.service';

describe('CommonSerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonSerService = TestBed.get(CommonSerService);
    expect(service).toBeTruthy();
  });
});
