import { Component, inject } from '@angular/core';
import { OtpService } from '../../services/otp.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import intlTelInput from 'intl-tel-input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp-send',
  templateUrl: './otp-send.component.html',
  styleUrl: './otp-send.component.css',
})
export class OtpSendComponent {
  router = inject(Router);
  toastr = inject(ToastrService);
  routeParams = inject(ActivatedRoute);

  pageParam: string = '';

  otpSendForm = new FormGroup({
    phone: new FormControl('', [Validators.required]),
  });

  constructor(private otpSrv: OtpService) {}

  get f() {
    return this.otpSendForm.controls;
  }

  ngOnInit() {
    this.isAuthenticated();

    // intl tel number
    const input: any = document.querySelector('#phone');
    intlTelInput(input, {
      initialCountry: 'us',
      showSelectedDialCode: true,
      placeholderNumberType: 'MOBILE',
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@21.2.4/build/js/utils.js',
    });

    // find the page url parameter
    this.pageParam = this.routeParams.snapshot.queryParams['page'];

    console.log(this.pageParam);
    // this.routeParams.params.subscribe((params) => {
    //   this.paramPage = params['pageRedirect']; // Access the 'id' parameter from the URL
    //   console.log('paramPage:', this.paramPage);
    // });
  }

  title = 'intlInputNew';

  isAuthenticated() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken !== null) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  submit() {
    var input = document.querySelector('#phone') as HTMLInputElement;
    var intlInstance = (window as any).intlTelInputGlobals.getInstance(input);
    var selectedCountryData = intlInstance.getSelectedCountryData();
    var dialCode = selectedCountryData.dialCode;
    var phoneNumber = input.value;
    console.log('Selected Country Code:', dialCode);
    console.log('Inputted Phone Number:', phoneNumber);

    const otpSendPayload: any = {
      countryCode: `+${dialCode}`,
      phoneNumber: phoneNumber,
    };

    this.otpSrv.onOTPSend(otpSendPayload).subscribe(
      (otpRes: any) => {
        console.log('otpRes: ', otpRes);
        this.toastr.success('New OTP sent successfully');
        this.router.navigateByUrl(`/otp-verify?page=${this.pageParam}`);
      },
      (otpError: any) => {
        console.error('Error registering user: ', otpError);
        this.toastr.error(otpError?.error?.message);
      }
    );
  }
}
