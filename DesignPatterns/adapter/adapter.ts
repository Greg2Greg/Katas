import { StripeApi } from './external-api.ts';

interface PaymentProvider {
  pay(amount: number): void;
}

class CheckoutService {
  constructor(private paymentProvider: PaymentProvider) {}

  checkout(total: number) {
    this.paymentProvider.pay(total);
  }
}

/* 
    Takes the external API and adapts it to the target interface expected by the client.
    An adapter is a wrapper which translates an existing interface into a target interface
*/
class StripePaymentAdapter implements PaymentProvider {
  constructor(private stripeApi: StripeApi) {}

  pay(amount: number): void {
    const amountInCents = amount * 100;
    this.stripeApi.makePaymentInCents(amountInCents);
  }
}

const stripeApi = new StripeApi();
const paymentProvider = new StripePaymentAdapter(stripeApi);
const checkoutService = new CheckoutService(paymentProvider);

checkoutService.checkout(49.99);
