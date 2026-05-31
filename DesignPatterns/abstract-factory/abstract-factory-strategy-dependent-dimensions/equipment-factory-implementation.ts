import { ElementEffect } from '../abstract-factory-strategy-independant-dimensions/element.ts';
import { Material } from '../abstract-factory-strategy-independant-dimensions/material.ts';
import { EquipmentFactory } from './equipment-factory-interface.ts';
import { DefaultBow, DefaultArrow, DefaultArmor } from './equipment-implementation.ts';
import { ElementMaterialInteractionResolver } from './interaction-resolver.ts';
import { Armor, Arrow, Bow } from './product-interface.ts';

export class DefaultEquipmentFactory implements EquipmentFactory {
  private readonly interactionResolver: ElementMaterialInteractionResolver;
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material
  ) {
    this.interactionResolver = new ElementMaterialInteractionResolver();
  }

  createBow(): Bow {
    return new DefaultBow(this.element, this.material, this.interactionResolver);
  }

  createArrow(): Arrow {
    return new DefaultArrow(this.element, this.material, this.interactionResolver);
  }

  createArmor(): Armor {
    return new DefaultArmor(this.element, this.material, this.interactionResolver);
  }
}
