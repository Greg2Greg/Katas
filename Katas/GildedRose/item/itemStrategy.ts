import { Alteration } from './item.ts';

export interface ItemStrategy {
  computeQuality(data: { quality: number; sellIn: number; alterations?: Alteration[] }): number;
}

export abstract class ItemAbstractStrategy implements ItemStrategy {
  abstract MAXIMUM_QUALITY: number;
  abstract MINIMUM_QUALITY: number;

  abstract computeQuality(data: { quality: number; sellIn: number; alterations: Alteration[] }): number;

  protected hasSellDatePassed(sellIn: number) {
    return sellIn < 0;
  }

  protected incrementQuality(quality: number, value: number): number {
    const isUpdatedQualityBelowMaximumQuality = quality + value > this.MAXIMUM_QUALITY;

    if (isUpdatedQualityBelowMaximumQuality) {
      return 50;
    }

    return quality + value;
  }

  protected decrementQuality(quality: number, value: number): number {
    const isUpdatedQualityBelowMinimumQuality = quality - value < this.MINIMUM_QUALITY;

    if (isUpdatedQualityBelowMinimumQuality) {
      return 0;
    }

    return quality - value;
  }
}
