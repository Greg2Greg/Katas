import { ElementKind, ElementEffect } from '../abstract-factory-strategy-independant-dimensions/element.ts';
import { MaterialKind, Material } from '../abstract-factory-strategy-independant-dimensions/material.ts';
import { BattleContext } from './battle-context.ts';
import {
  FireLeatherInteraction,
  FireGoldInteraction,
  WaterLeatherInteraction,
  WaterGoldInteraction,
} from './interaction-implementation.ts';
import { ElementMaterialInteraction } from './interaction-interface.ts';

type InteractionKey = `${ElementKind}:${MaterialKind}`;

export class ElementMaterialInteractionResolver {
  private readonly interactions = new Map<InteractionKey, ElementMaterialInteraction>();

  constructor() {
    this.register([
      new FireLeatherInteraction(),
      new FireGoldInteraction(),
      new WaterLeatherInteraction(),
      new WaterGoldInteraction(),
    ]);
  }

  resolveAttackEffects(element: ElementEffect, material: Material, context: BattleContext): string[] {
    const interaction = this.findInteraction(element, material);
    return interaction?.applyToAttack(context) ?? [];
  }

  resolveDefenseEffects(element: ElementEffect, material: Material, context: BattleContext): string[] {
    const interaction = this.findInteraction(element, material);
    return interaction?.applyToDefense(context) ?? [];
  }

  private register(interactions: ElementMaterialInteraction[]): void {
    interactions.forEach((interaction) => {
      const key = this.getKeyFromKinds(interaction.elementKind, interaction.materialKind);

      this.interactions.set(key, interaction);
    });
  }

  private findInteraction(
    element: ElementEffect,
    material: Material
  ): ElementMaterialInteraction | undefined {
    const key = this.getKeyFromKinds(element.kind, material.kind);

    return this.interactions.get(key);
  }

  private getKeyFromKinds(elementKind: ElementKind, materialKind: MaterialKind): InteractionKey {
    return `${elementKind}:${materialKind}`;
  }
}
