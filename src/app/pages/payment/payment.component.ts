import { Component } from '@angular/core';
import { StripeService } from '../../services/stripe.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  stripe: any;
  cardElement: any;

  constructor(private stripeService: StripeService) {}

  async onRedirectToPayment() {
    // const model = {
    //   productName: 'Screen Model 1',
    //   productDescription: 'Roof Screen Size 50 inches',
    //   productPrice: 200,
    // };

    const model = {
      priceId: 'price_1P4SDAG9KASkEPLwOjZTNeBr',
    };

    await this.stripeService.redirectToPayment(model);
  }
}
