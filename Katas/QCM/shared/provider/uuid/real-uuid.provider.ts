import { v4 as uuidv4 } from 'uuid';
import { UuidProvider } from '../../abstraction/uuid-provider.ts';

export class RealUuidProvider implements UuidProvider {
  generate(): string {
    return uuidv4();
  }
}
