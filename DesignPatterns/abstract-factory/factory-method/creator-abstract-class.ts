import { Bow, Arrow, Armor } from '../abstract-factory-strategy-independant-dimensions/product-definition.ts';

export abstract class MedievalEquipment {
  // Template method : use factory methods to create products, then orchestrate them
  prepareForBattle(): void {
    console.log('\n--- Preparing for battle (Template Method approach) ---');

    const bow = this.createBow();
    const arrow = this.createArrow();
    const armor = this.createArmor();

    bow.shoot();
    arrow.fly();
    armor.protect();

    console.log('✓ Battle preparation complete!\n');
  }

  // Factory methods
  protected abstract createBow(): Bow;
  protected abstract createArrow(): Arrow;
  protected abstract createArmor(): Armor;
}
