import { RandomNumberGenerator } from '../../models/models.ts';

export class StubRandomNumberGenerator implements RandomNumberGenerator {
  constructor(private readonly number: number) {}

  generate(): number {
    return this.number;
  }
}
