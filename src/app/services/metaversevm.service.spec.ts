import { TestBed } from '@angular/core/testing';

import { MetaversevmService } from './metaversevm.service';

describe('MetaversevmService', () => {
  let service: MetaversevmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetaversevmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
