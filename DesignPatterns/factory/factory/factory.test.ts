import { describe, expect, it, vi } from 'vitest';
import { Logistics } from './logistics.ts';
import { RoadTransportFactory } from './transport-factory.ts';

describe('Factory Method Pattern', () => {
  it('should create transport objects using inheritance', () => {
    const logSpy = vi.spyOn(console, 'log');
    const logistic = new Logistics(new RoadTransportFactory());
    logistic.planRoute('books', 'Paris');

    expect(logSpy).toHaveBeenCalledWith('Truck: delivering "books" to Paris by road.');
  });
});
