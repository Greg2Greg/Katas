import { Transport } from '../factory/transport.ts';
import { Truck } from '../factory/truck.ts';
import { Logistics } from './creator.ts';

export class RoadLogistics extends Logistics {
  protected createTransport(): Transport {
    return new Truck();
  }
}
