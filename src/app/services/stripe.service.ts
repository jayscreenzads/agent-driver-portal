import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment.development';
// const stripe = loadStripe(environment.stripePublishableKey);

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  stripePromise: Promise<Stripe>;

  constructor(private http: HttpClient) {
    this.stripePromise = this.loadStripe();
  }

  private loadStripe(): Promise<Stripe> {
    return (window as any).Stripe(environment.stripePublishableKey);
  }

  async redirectToPayment(data: any): Promise<void> {
    const stripe = await this.stripePromise; //loadStripe(environment.stripePublishableKey);

    const response = await fetch(
      `${environment.apiUBaseURL}/api/registration-payment/create-checkout-session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  }
}
