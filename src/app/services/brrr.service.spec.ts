import { TestBed } from '@angular/core/testing';

import { BrrrService } from './brrr.service';

describe('BrrrService', () => {
  let service: BrrrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrrrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
