interface PricingStrategy {
  compute(price: number): number;
  validate(price: number): boolean;
}

export class RegularPricing implements PricingStrategy {
  compute(price: number): number {
    return price;
  }

  validate(price: number): boolean {
    return price >= 0;
  }
}

export class DiscountPricing implements PricingStrategy {
  constructor(private discountPercentage: number) {}

  compute(price: number): number {
    return price - (price * this.discountPercentage) / 100;
  }

  validate(price: number): boolean {
    return price >= 0 && this.discountPercentage >= 0 && this.discountPercentage <= 100;
  }
}

type Dependencies = { pricingStrategy: PricingStrategy };
const regularPricing = new RegularPricing();
const discountPricing = new DiscountPricing(10);
const pricingStrategy = process.env.discriminator === 'discount' ? discountPricing : regularPricing;
const dependencies: Dependencies = { pricingStrategy };
dependencies.pricingStrategy.compute(100);
