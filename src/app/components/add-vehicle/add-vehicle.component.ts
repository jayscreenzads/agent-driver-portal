import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css',
})
export class AddVehicleComponent {
  @Input() registerProcessForm: any;
  @Input() registerVehicleObj: any;
  @Output() registerSubmit = new EventEmitter<any>();

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

  onSubmit() {
    console.log('submit child');
    this.registerSubmit.emit();
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
