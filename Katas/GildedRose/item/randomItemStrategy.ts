import { Alteration } from './item.ts';
import { ItemAbstractStrategy } from './itemStrategy.ts';

export class RandomItemStrategy extends ItemAbstractStrategy {
  override MAXIMUM_QUALITY = 50;
  override MINIMUM_QUALITY = 0;

  computeQuality(data: { quality: number; sellIn: number; alterations: Alteration[] }): number {
    const { quality, sellIn, alterations } = data;

    // Could implement a Strategy pattern also for Alteration ?
    if (this.hasSellDatePassed(sellIn) || alterations?.includes('CONJURED')) {
      return this.decrementQuality(quality, 2);
    }

    return this.decrementQuality(quality, 1);
  }
}
