import { ElementKind } from '../abstract-factory-strategy-independant-dimensions/element.ts';
import { MaterialKind } from '../abstract-factory-strategy-independant-dimensions/material.ts';
import { BattleContext } from './battle-context.ts';

export interface ElementMaterialInteraction {
  readonly elementKind: ElementKind;
  readonly materialKind: MaterialKind;

  applyToAttack(context: BattleContext): string[];
  applyToDefense(context: BattleContext): string[];
}
