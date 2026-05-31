import { Bow, Arrow, Armor } from './product-interface.ts';

export interface EquipmentFactory {
  createBow(): Bow;
  createArrow(): Arrow;
  createArmor(): Armor;
}
