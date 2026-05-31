import { TransportFactory } from './transport-factory.ts';

export class Logistics {
  constructor(private readonly transportFactory: TransportFactory) {}

  planRoute(cargo: string, destination: string): void {
    const transport = this.transportFactory.createTransport();
    transport.deliver(cargo, destination);
  }
}
