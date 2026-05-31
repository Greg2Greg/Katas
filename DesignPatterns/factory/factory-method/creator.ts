import { Transport } from '../factory/transport.ts';

export abstract class Logistics {
  // Factory method which needs to be implemented by subclasses
  protected abstract createTransport(): Transport;

  planRoute(cargo: string, destination: string): void {
    const transport = this.createTransport();
    transport.deliver(cargo, destination);
  }
}
