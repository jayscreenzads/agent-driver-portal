import { TestBed } from '@angular/core/testing';

import { ResubmitImageService } from './resubmit-image.service';

describe('ResubmitImageService', () => {
  let service: ResubmitImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResubmitImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
