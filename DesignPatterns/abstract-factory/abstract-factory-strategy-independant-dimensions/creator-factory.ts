import { Bow, Arrow, Armor } from './product-definition.ts';
import { DefaultArmor, DefaultArrow, DefaultBow } from './default-equipement.ts';
import { ElementEffect } from './element.ts';
import { Material } from './material.ts';

export interface EquipmentFactory {
  createBow(): Bow;
  createArrow(): Arrow;
  createArmor(): Armor;
}

export class DefaultEquipmentFactory implements EquipmentFactory {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material
  ) {}

  createBow(): Bow {
    return new DefaultBow(this.element, this.material);
  }

  createArrow(): Arrow {
    return new DefaultArrow(this.element, this.material);
  }

  createArmor(): Armor {
    return new DefaultArmor(this.element, this.material);
  }
}
