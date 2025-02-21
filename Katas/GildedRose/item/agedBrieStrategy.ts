import { ItemAbstractStrategy } from './itemStrategy.ts';

export class AgedBrieItemStrategy extends ItemAbstractStrategy {
  override MAXIMUM_QUALITY = 50;
  override MINIMUM_QUALITY = 0;

  computeQuality(data: { quality: number; sellIn: number }): number {
    const { quality, sellIn } = data;

    if (this.hasSellDatePassed(sellIn)) {
      return this.incrementQuality(quality, 2);
    }

    return this.incrementQuality(quality, 1);
  }
}
