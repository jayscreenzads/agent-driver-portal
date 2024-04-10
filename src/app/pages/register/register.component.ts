import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { DriverService } from '../../services/driver.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerProcessForm: any = {
    userShow: true,
    driverShow: false,
    vehicleShow: false,
  };

  registerUserObj: any = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffixName: '',
    dateOfBirth: '',
    addressLine1: '',
    addressLine2: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'AGENT_DRIVER',
  };

  registerDriverObj: any = {
    dl: '',
    ssn: '',
    preferredLoc: '',
    dateRegistered: '',
    dateApproved: '',
  };

  registerVehicleObj: any = {
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
  };

  registerObj: any = {};

  router = inject(Router);
  toastr = inject(ToastrService);

  constructor(
    private userSrv: UserService,
    private driverSrv: DriverService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit() {
    this.isAuthenticated();
    this.registerObj = {
      ...this.registerUserObj,
      ...this.registerDriverObj,
      ...this.registerVehicleObj,
    };
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onRegister() {
    const registerObj = {
      ...this.registerUserObj,
      ...this.registerDriverObj,
      ...this.registerVehicleObj,
    };

    console.log('parent: ', registerObj);

    this.userSrv.onRegister(this.registerUserObj).subscribe(
      (userRes: any) => {
        console.log('userRes: ', userRes);

        const driverPayload: any = {
          ...this.registerDriverObj,
          userId: userRes?.data?.user?.id,
        };

        this.driverSrv.onCreateDriver(driverPayload).subscribe(
          (driverRes: any) => {
            console.log('driverRes: ', driverRes);

            const vehiclePayload: any = {
              ...this.registerVehicleObj,
              driverId: driverRes?.data?.driver?.id,
            };

            this.vehicleSrv.onCreateVehicle(vehiclePayload).subscribe(
              (vehicleRes: any) => {
                console.log('vehicleRes: ', vehicleRes);

                console.log('success');
                this.toastr.success('New agent driver registered successfully');
                this.router.navigateByUrl('/login');
              },
              (vehicleError: any) => {
                console.error('Error creating vehicle: ', vehicleError);
                // Handle vehicle creation error here
              }
            );
          },
          (driverError: any) => {
            console.error('Error creating driver: ', driverError);
            // Handle driver creation error here
          }
        );
      },
      (userError: any) => {
        console.error('Error registering user: ', userError);
        this.toastr.error(userError?.error?.message);
      }
    );
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
