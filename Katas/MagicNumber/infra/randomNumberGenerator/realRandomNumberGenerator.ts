import { RandomNumberGenerator } from '../../models/models.ts';

export class RealRandomNumberGenerator implements RandomNumberGenerator {
  generate(): number {
    return Math.floor(Math.random() * 100);
  }
}
