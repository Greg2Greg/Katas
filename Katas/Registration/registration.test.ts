import { describe, test, expect } from 'vitest';
import {
  InmemoryPasswordHasher,
  InmemoryUserRepository,
  Registration,
  RegistrationCommand,
} from './registration.ts';

describe('Registration', () => {
  test('Should registrate account', async () => {
    const userRepository = new InmemoryUserRepository();
    const command = new RegistrationCommand('test@gmail.com', 'Motdepasse123');
    const registration = new Registration(userRepository, new InmemoryPasswordHasher());

    await registration.execute(command);

    const user = await userRepository.findByEmailAddress('test@gmail.com');
    expect(user).toEqual({ emailAddress: 'test@gmail.com', password: 'hashed-Motdepasse123' });
  });

  test('Should fail because account already exists', async () => {
    const userRepository = new InmemoryUserRepository();
    userRepository.save({ emailAddress: 'test@gmail.com', password: 'Motdepasse123' });
    const command = new RegistrationCommand('test@gmail.com', 'Motdepasse123');
    const registration = new Registration(userRepository, new InmemoryPasswordHasher());

    const execute = registration.execute(command);
    expect(execute).rejects.toThrow('Email address already exists');
  });

  test('Should fail because password with less than 5 chars', async () => {
    const userRepository = new InmemoryUserRepository();
    const command = new RegistrationCommand('test@gmail.com', 'teA1');
    const registration = new Registration(userRepository, new InmemoryPasswordHasher());

    const execute = registration.execute(command);
    expect(execute).rejects.toThrow('Password is not safe enough');
  });

  test('Should fail because password without number', async () => {
    const userRepository = new InmemoryUserRepository();
    const command = new RegistrationCommand('test@gmail.com', 'testeoA');
    const registration = new Registration(userRepository, new InmemoryPasswordHasher());

    const execute = registration.execute(command);
    expect(execute).rejects.toThrow('Password is not safe enough');
  });

  test('Should fail because password without capital letter', async () => {
    const userRepository = new InmemoryUserRepository();
    const command = new RegistrationCommand('test@gmail.com', 'testeo1');
    const registration = new Registration(userRepository, new InmemoryPasswordHasher());

    const execute = registration.execute(command);
    expect(execute).rejects.toThrow('Password is not safe enough');
  });
});
