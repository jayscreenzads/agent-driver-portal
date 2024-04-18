import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { DriverService } from '../../services/driver.service';
import { VehicleService } from '../../services/vehicle.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  router = inject(Router);
  toastr = inject(ToastrService);

  images: any = [];
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    middleName: new FormControl(),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    suffixName: new FormControl(''),
    dateOfBirth: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    role: new FormControl('AGENT_DRIVER', [Validators.required]),

    // Driver Section
    dl: new FormControl('', [Validators.required, Validators.minLength(3)]),
    ssn: new FormControl('', [Validators.required, Validators.minLength(3)]),
    preferredLoc: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    dateRegistered: new FormControl('', [Validators.required]),
    dateApproved: new FormControl(),
    userId: new FormControl('', [Validators.required]),

    // Vehicle Section
    vehicleMake: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    vehicleModel: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    vehicleYear: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    file: new FormControl(),
    fileSource: new FormControl(),
  });

  constructor(
    private userSrv: UserService,
    private driverSrv: DriverService,
    private vehicleSrv: VehicleService
  ) {}

  ngOnInit() {
    this.isAuthenticated();
    this.isOTPVerified();
  }

  isOTPVerified() {
    const otpVerified = localStorage.getItem('otpVerified');
    if (otpVerified !== null) {
      this.router.navigateByUrl('/register');
    } else {
      this.router.navigateByUrl('/otp-send?page=register');
    }
  }

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.images.push(event.target.result);

          this.registerForm.patchValue({
            fileSource: this.images,
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  submit() {
    console.log(this.registerForm.value);

    this.userSrv.onRegister(this.registerForm.value).subscribe(
      (userRes: any) => {
        console.log('userRes: ', userRes);

        const driverPayload: any = {
          ...this.registerForm.value,
          userId: userRes?.data?.user?.id,
        };

        this.driverSrv.onCreateDriver(driverPayload).subscribe(
          (driverRes: any) => {
            console.log('driverRes: ', driverRes);

            const vehiclePayload: any = {
              ...this.registerForm.value,
              driverId: driverRes?.data?.driver?.id,
            };

            this.vehicleSrv.onCreateVehicle(vehiclePayload).subscribe(
              (vehicleRes: any) => {
                console.log('vehicleRes: ', vehicleRes);

                console.log('success');
                this.toastr.success('New agent driver registered successfully');
                this.router.navigateByUrl('/payment');
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
}
