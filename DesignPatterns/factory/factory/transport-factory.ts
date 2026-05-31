import { Transport } from './transport.ts';
import { Truck } from './truck.ts';

export interface TransportFactory {
  createTransport(): Transport;
}

export class RoadTransportFactory implements TransportFactory {
  createTransport(): Transport {
    return new Truck();
  }
}
