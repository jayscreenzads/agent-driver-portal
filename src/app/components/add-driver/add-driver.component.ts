import { Component, Input, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css',
})
export class AddDriverComponent {
  @Input() registerProcessForm: any;
  @Input() registerDriverObj: any;

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

  // Method to navigate to the previous form
  goToPreviousStep() {
    console.log('goToPreviousStep');
    if (this.registerProcessForm.driverShow) {
      this.registerProcessForm.driverShow = false;
      this.registerProcessForm.userShow = true;
    } else if (this.registerProcessForm.vehicleShow) {
      this.registerProcessForm.vehicleShow = false;
      this.registerProcessForm.driverShow = true;
    }

    console.log(this.registerProcessForm);
  }

  goToNextStep() {
    console.log('goToNextStep');
    if (this.registerProcessForm.userShow) {
      this.registerProcessForm.userShow = false;
      this.registerProcessForm.driverShow = true;
    } else if (this.registerProcessForm.driverShow) {
      this.registerProcessForm.driverShow = false;
      this.registerProcessForm.vehicleShow = true;
    }
  }

  // onRegister() {
  //   console.log('onRegister');
  //   this.userSrv.onRegister(this.registerObj).subscribe(
  //     (res: any) => {
  //       console.log('success');
  //       this.toastr.success('Registered successfully');
  //       this.router.navigateByUrl('/login');
  //     },
  //     (error: any) => {
  //       // Check if error object and error.error object exist
  //       // this.toastr.error(error?.error?.message);
  //     }
  //   );
  // }
}
