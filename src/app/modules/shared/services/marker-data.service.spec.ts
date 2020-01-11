import { TestBed } from '@angular/core/testing';

import { MarkerDataService } from './marker-data.service';

describe('MarkerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarkerDataService = TestBed.get(MarkerDataService);
    expect(service).toBeTruthy();
  });
});
