import { UuidProvider } from '../../abstraction/uuid-provider.ts';

export class StubUuidProvider implements UuidProvider {
  constructor(public id: string = '0') {}

  generate(): string {
    return this.id;
  }
}
