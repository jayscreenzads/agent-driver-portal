import { TestBed } from '@angular/core/testing';

import { AccountApprovalService } from './account-approval.service';

describe('AccountApprovalService', () => {
  let service: AccountApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
