import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountApprovalComponent } from './account-approval.component';

describe('AccountApprovalComponent', () => {
  let component: AccountApprovalComponent;
  let fixture: ComponentFixture<AccountApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
