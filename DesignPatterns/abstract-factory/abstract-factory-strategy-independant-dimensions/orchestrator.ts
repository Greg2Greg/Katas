import { EquipmentFactory } from './creator-factory.ts';

export class BattlePreparation {
  constructor(private readonly equipmentFactory: EquipmentFactory) {}

  prepareForBattle(): void {
    const bow = this.equipmentFactory.createBow();
    const arrow = this.equipmentFactory.createArrow();
    const armor = this.equipmentFactory.createArmor();

    bow.shoot();
    arrow.fly();
    armor.protect();
  }
}
