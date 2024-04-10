import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  forgotObj: any = {
    email: '',
  };

  router = inject(Router);
  toastr = inject(ToastrService);

  constructor(private userSrv: UserService) {}

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }

  onForgot() {
    console.log('onForgot');
    this.userSrv.onForgot(this.forgotObj).subscribe(
      (res: any) => {
        console.log('success');
        this.toastr.success(
          'An email to reset your password has been successfully sent.'
        );
        this.router.navigateByUrl('/login');
      },
      (error: any) => {
        // Check if error object and error.error object exist
        // this.toastr.error(error?.error?.message);
      }
    );
  }
}
