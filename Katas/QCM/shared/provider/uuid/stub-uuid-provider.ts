import { UuidProvider } from './uuid-provider.ts';

export class StubUuidProvider implements UuidProvider {
  constructor(private readonly id: string) {}

  generate(): string {
    return this.id;
  }
}
