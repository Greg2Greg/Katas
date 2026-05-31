import { describe, expect, it, vi } from 'vitest';
import { FireLeatherMedievalEquipment } from './creator-factory.ts';

describe('Abstract Factory Pattern - Template Method', () => {
  it('usage', () => {
    // Easy to instanciate
    const spy = vi.spyOn(console, 'log');

    const fireLeatherMedievalEquipment = new FireLeatherMedievalEquipment();
    fireLeatherMedievalEquipment.prepareForBattle();

    expect(spy).toHaveBeenCalledWith('🔥 FireLeatherBow shoots a fiery arrow with leather grip!');
    expect(spy).toHaveBeenCalledWith('🔥 FireLeatherArrow flies through the air, engulfed in flames!');
    expect(spy).toHaveBeenCalledWith('🔥 FireLeatherArmor protects with fire-resistant leather!');
  });
});
