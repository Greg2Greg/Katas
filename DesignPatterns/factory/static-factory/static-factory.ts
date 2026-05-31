import { Transport } from '../factory/transport.ts';
import { Truck } from '../factory/truck.ts';

// Static Factory
export class TransportFactoryStatic {
  static create(transportType: 'road' | 'ship'): Transport {
    switch (transportType) {
      case 'road':
        return new Truck();
      case 'ship':
        throw new Error('Ship transport not implemented yet');
      default:
        throw new Error(`Unknown transport type: ${transportType}`);
    }
  }
}
