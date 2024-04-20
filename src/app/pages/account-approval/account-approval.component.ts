import { Component, inject } from '@angular/core';
import { AccountApprovalService } from '../../services/account-approval.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-approval',
  templateUrl: './account-approval.component.html',
  styleUrl: './account-approval.component.css',
})
export class AccountApprovalComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  paramUserId: any = null;
  accountData: any = {};
  disableButton: boolean = false;

  approvalForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
  });

  constructor(private approvalSrv: AccountApprovalService) {}

  get f() {
    return this.approvalForm.controls;
  }

  ngOnInit() {
    this.isAuthenticated();

    // find the page url parameter
    this.getParamId();

    this.getAccountInfo(this.paramUserId);

    console.log(this.paramUserId);
  }

  getParamId() {
    this.paramUserId = this.routeParams.snapshot.paramMap.get('userId');
    console.log('Param ID:', this.paramUserId);
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      console.log('Unauthenticated access token');
    }
  }

  getAccountInfo(paramUserId: number) {
    console.log('getAccountInfo paramUserId: ', paramUserId);
    this.approvalSrv.onGetAccount(paramUserId).subscribe(
      (res: any) => {
        console.log('accountData: ', res);

        if (!res) {
          this.disableButton = true;
          this.toastr.error('This account do not exists!');
        }

        if (
          res?.data?.status &&
          res?.data?.status !== 'VERIFICATION_PENDING!'
        ) {
          this.disableButton = true;
          this.toastr.error('The status account is not VERIFICATION_PENDING!');
        }
      },
      (approvalError: any) => {
        console.error('Error registering user: ', approvalError?.error?.error);
        this.toastr.error(approvalError?.error?.error);
      }
    );
  }

  submit() {
    this.approvalSrv
      .onUpdateAccount(this.approvalForm.value, parseInt(this.paramUserId))
      .subscribe(
        (res: any) => {
          console.log('approval res: ', res);
          this.toastr.success(
            `Account of ${this.accountData?.email} ${this.approvalForm.value?.status} successfully`
          );

          this.router.navigateByUrl(`/dashboard`);
        },
        (approvalError: any) => {
          console.error('Error registering user: ', approvalError);
          this.toastr.error(approvalError?.error?.message);
        }
      );
  }
}
