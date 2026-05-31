import { Bow, Arrow, Armor } from './product-definition.ts';
import { ElementEffect } from './element.ts';
import { Material } from './material.ts';

export class DefaultBow implements Bow {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material
  ) {}

  shoot(): void {
    console.log(this.element.applyToAttack('DefaultBow'));
    console.log(`Material property: ${this.material.describeWeight()}`);
  }
}

export class DefaultArrow implements Arrow {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material
  ) {}

  fly(): void {
    console.log(this.element.applyToAttack('DefaultArrow'));
    console.log(`Material property: ${this.material.describeResistance()}`);
  }
}

export class DefaultArmor implements Armor {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material
  ) {}

  protect(): void {
    console.log(this.element.applyToDefense('DefaultArmor'));
    console.log(`Material property: ${this.material.describeResistance()}`);
  }
}
