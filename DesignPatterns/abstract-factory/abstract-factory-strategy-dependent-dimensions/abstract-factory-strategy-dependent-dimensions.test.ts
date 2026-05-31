import { describe, expect, it, vi } from 'vitest';
import { DefaultEquipmentFactory } from './equipment-factory-implementation.ts';
import { FireElement } from '../abstract-factory-strategy-independant-dimensions/element.ts';
import { LeatherMaterial } from '../abstract-factory-strategy-independant-dimensions/material.ts';
import { BattlePreparation } from './orchestrator.ts';

describe('Abstract factory with dependant dimensions', () => {
  it('usage', () => {
    const spy = vi.spyOn(console, 'log');

    const element = new FireElement();
    const material = new LeatherMaterial();
    const defaultEquipment = new DefaultEquipmentFactory(element, material);

    const battle = new BattlePreparation(defaultEquipment);
    battle.battle({ isDaylight: true });

    expect(spy).toHaveBeenCalledWith('Shooting a leather bow with burning fire damage');
    expect(spy).toHaveBeenCalledWith('Material effect: lightweight');
    expect(spy).toHaveBeenCalledWith('Interaction effect: suffering scream deals extra damage to the enemy.');
    expect(spy).toHaveBeenCalledWith('A leather arrow flies with burning fire damage');
    expect(spy).toHaveBeenCalledWith('Material effect: flexible but not very resistant');
  });
});
