import { Transport } from './transport.ts';

export class Truck implements Transport {
  deliver(cargo: string, destination: string): void {
    console.log(`Truck: delivering "${cargo}" to ${destination} by road.`);
  }
}
