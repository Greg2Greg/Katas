import { describe, expect, it, vi } from 'vitest';
import { DefaultEquipmentFactory } from './creator-factory.ts';
import { FireElement } from './element.ts';
import { LeatherMaterial } from './material.ts';
import { BattlePreparation } from './orchestrator.ts';

describe('Abstract factory with Strategy Pattern', () => {
  it('usage', () => {
    // More verbosity during instanciation
    const spy = vi.spyOn(console, 'log');
    const fireLeatherFactory = new DefaultEquipmentFactory(new FireElement(), new LeatherMaterial());
    const fireLeatherBattlePreparation = new BattlePreparation(fireLeatherFactory);

    fireLeatherBattlePreparation.prepareForBattle();

    expect(spy).toHaveBeenCalledWith('DefaultBow with burning fire damage');
    expect(spy).toHaveBeenCalledWith('Material property: lightweight');
    expect(spy).toHaveBeenCalledWith('DefaultArrow with burning fire damage');
    expect(spy).toHaveBeenCalledWith('Material property: flexible but not very resistant');
    expect(spy).toHaveBeenCalledWith('DefaultArmor with heat resistance');
    expect(spy).toHaveBeenCalledWith('Material property: flexible but not very resistant');
  });
});
