import { ElementEffect } from '../abstract-factory-strategy-independant-dimensions/element.ts';
import { Material } from '../abstract-factory-strategy-independant-dimensions/material.ts';
import { BattleContext } from './battle-context.ts';
import { ElementMaterialInteractionResolver } from './interaction-resolver.ts';
import { Bow, Arrow, Armor } from './product-interface.ts';

export class DefaultBow implements Bow {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material,
    private readonly interactionResolver: ElementMaterialInteractionResolver
  ) {}

  shoot(context: BattleContext): void {
    const baseAction = `Shooting a ${this.material.kind} bow`;

    const defaultAttack = this.element.applyToAttack(baseAction);
    const materialEffect = `Material effect: ${this.material.describeWeight()}`;
    const interactionEffects = this.interactionResolver.resolveAttackEffects(
      this.element,
      this.material,
      context
    );

    console.log(defaultAttack);
    console.log(materialEffect);

    interactionEffects.forEach((effect) => {
      console.log(effect);
    });
  }
}

export class DefaultArrow implements Arrow {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material,
    private readonly interactionResolver: ElementMaterialInteractionResolver
  ) {}

  fly(context: BattleContext): void {
    const baseAction = `A ${this.material.kind} arrow flies`;

    const defaultAttack = this.element.applyToAttack(baseAction);
    const materialEffect = `Material effect: ${this.material.describeResistance()}`;
    const interactionEffects = this.interactionResolver.resolveAttackEffects(
      this.element,
      this.material,
      context
    );

    console.log(defaultAttack);
    console.log(materialEffect);

    interactionEffects.forEach((effect) => {
      console.log(effect);
    });
  }
}
export class DefaultArmor implements Armor {
  constructor(
    private readonly element: ElementEffect,
    private readonly material: Material,
    private readonly interactionResolver: ElementMaterialInteractionResolver
  ) {}

  protect(context: BattleContext): void {
    const baseAction = `A ${this.material.kind} armor protects`;

    const defaultDefense = this.element.applyToDefense(baseAction);
    const materialEffect = `Material effect: ${this.material.describeResistance()}`;
    const interactionEffects = this.interactionResolver.resolveDefenseEffects(
      this.element,
      this.material,
      context
    );

    console.log(defaultDefense);
    console.log(materialEffect);

    interactionEffects.forEach((effect) => {
      console.log(effect);
    });
  }
}
