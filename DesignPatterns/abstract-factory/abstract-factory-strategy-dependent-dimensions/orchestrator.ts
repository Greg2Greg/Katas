import { BattleContext } from './battle-context.ts';
import { EquipmentFactory } from './equipment-factory-interface.ts';

export class BattlePreparation {
  constructor(private readonly equipmentFactory: EquipmentFactory) {}

  battle(context: BattleContext): void {
    const bow = this.equipmentFactory.createBow();
    const arrow = this.equipmentFactory.createArrow();
    const armor = this.equipmentFactory.createArmor();

    bow.shoot(context);
    arrow.fly(context);
    armor.protect(context);
  }
}
