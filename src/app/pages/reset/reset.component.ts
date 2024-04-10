import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css',
})
export class ResetComponent {
  resetObj: any = {
    resetPasswordToken: '',
    newPassword: '',
    confirmPassword: '',
  };

  resetToken: any = null;

  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.isAuthenticated();

    this.routeParams.paramMap.subscribe((params) => {
      this.resetObj.resetPasswordToken = params.get('token');
      console.log(params.get('token'));
    });
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onReset() {
    this.userSrv.onReset(this.resetObj).subscribe(
      (res: any) => {
        console.log('success');
        this.toastr.success('Password has been reset successfully');
        this.router.navigateByUrl('/login');
      },
      (error) => {
        // this.toastr.error(error.error.error);
      }
    );
  }
}
