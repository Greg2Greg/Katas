import { ItemAbstractStrategy } from './itemStrategy.ts';

export class BackstageConcertStrategy extends ItemAbstractStrategy {
  override MAXIMUM_QUALITY = 50;
  override MINIMUM_QUALITY = 0;

  computeQuality(data: { quality: number; sellIn: number }): number {
    const { quality, sellIn } = data;

    if (this.hasSellDatePassed(sellIn)) {
      return 0;
    }
    if (sellIn < 6) {
      return this.incrementQuality(quality, 3);
    }
    if (sellIn < 11) {
      return this.incrementQuality(quality, 2);
    }

    return this.incrementQuality(quality, 1);
  }
}
