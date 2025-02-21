import { AgedBrieItemStrategy } from './agedBrieStrategy.ts';
import { BackstageConcertStrategy } from './backstageConcertStrategy.ts';
import { ItemStrategy } from './itemStrategy.ts';
import { RandomItemStrategy } from './randomItemStrategy.ts';

type Name =
  | 'Aged Brie'
  | 'Backstage passes to a TAFKAL80ETC concert'
  | 'Sulfuras, Hand of Ragnaros'
  | 'Random item';

export type Alteration = 'CONJURED' | 'NONE';

export class Item {
  constructor(
    private name: Name,
    private sellIn: number,
    private quality: number,
    private readonly alterations?: Alteration[] | undefined
  ) {
    // Could use strategy pattern to valide item rules
    if (this.name !== 'Sulfuras, Hand of Ragnaros' && (this.quality > 50 || this.quality < 0)) {
      throw new Error();
    }

    if (this.name === 'Sulfuras, Hand of Ragnaros' && this.quality !== 80) {
      throw new Error();
    }
  }

  updateItem(): void {
    this.sellIn = this.computeSellDate();
    this.quality = this.computeQuality();
  }

  private computeQuality(): number {
    const strategyMap: { [key: string]: ItemStrategy } = {
      'Random item': new RandomItemStrategy(),
      'Backstage passes to a TAFKAL80ETC concert': new BackstageConcertStrategy(),
      'Aged Brie': new AgedBrieItemStrategy(),
    };

    const strategy = strategyMap[this.name];

    if (!strategy) {
      return this.quality;
    }

    return strategy.computeQuality({
      quality: this.quality,
      sellIn: this.sellIn,
      alterations: this.alterations,
    });
  }

  private computeSellDate(): number {
    if (this.name === 'Sulfuras, Hand of Ragnaros') {
      return this.sellIn;
    }
    return this.sellIn - 1;
  }
}
