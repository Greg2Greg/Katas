// Record function = sort of interface in FP world without any state
type PricingStrategy = {
  compute: (price: number) => number;
  validate: (price: number) => boolean;
};

export const regularPricing: PricingStrategy = {
  compute: (price) => price,
  validate: (price) => price >= 0,
};

export const discountPricing = (discountPercentage: number): PricingStrategy => {
  return {
    compute: (price) => price - (price * discountPercentage) / 100,
    validate: (price) => price >= 0 && discountPercentage >= 0 && discountPercentage <= 100,
  };
};

type Dependencies = { pricingStrategy: PricingStrategy };
const pricingStrategy = process.env.discriminator === 'discount' ? discountPricing(10) : regularPricing;
const dependencies: Dependencies = { pricingStrategy };
dependencies.pricingStrategy.compute(100);
dependencies.pricingStrategy.validate(100);
