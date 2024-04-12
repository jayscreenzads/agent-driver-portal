import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css',
})
export class PaymentSuccessComponent {
  router = inject(Router);

  constructor() {}

  goto(url: string) {
    if (url !== null) {
      this.router.navigateByUrl(url);
    }
  }
}
