import { describe, expect, it, vi } from 'vitest';
import { RoadLogistics } from './road-logistics.ts';

describe('Factory Method Pattern', () => {
  it('should create transport objects using inheritance', () => {
    const logSpy = vi.spyOn(console, 'log');
    const roadLogistics = new RoadLogistics();
    roadLogistics.planRoute('books', 'Paris');

    expect(logSpy).toHaveBeenCalledWith('Truck: delivering "books" to Paris by road.');
  });
});
