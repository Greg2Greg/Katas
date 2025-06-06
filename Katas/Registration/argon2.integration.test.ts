import { Argon2PasswordHasher } from './registration.ts';

describe('Argon2', () => {
  test('Should verify password', async () => {
    const hasher = new Argon2PasswordHasher();
    const password = 'test';
    const hashedPassword = await hasher.hash(password);

    const verify = hasher.verify(hashedPassword, password);
    expect(verify).resolves.toBe(true);
  });
  test('Should not verify password', async () => {
    const hasher = new Argon2PasswordHasher();
    const password = 'test';
    const hashedPassword = await hasher.hash('notgood');

    const verify = hasher.verify(hashedPassword, password);
    expect(verify).resolves.toBe(false);
  });
});
