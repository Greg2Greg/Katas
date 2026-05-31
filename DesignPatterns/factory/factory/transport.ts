export interface Transport {
  deliver(cargo: string, destination: string): void;
}
