/*
    A partir de ces classes, mettre en place un système où: 
        - Une adresse email est utilisable qu'une fois
        - Le password doit être encrypté 
        - Le password doit avoir au moins 6 chars, au moins 1 uppercase letter et au moins 1 nombre
    
    L'utilisateur doit être persisté
*/
import * as argon2 from 'argon2';

type Account = {
  emailAddress: string;
  password: string;
};

export interface UserRepository {
  save(account: Account): Promise<void>;
  findByEmailAddress(emailAddress: string): Promise<Account>;
  isEmailAddressAvailable(emailAddress: string): Promise<boolean>;
}

export class InmemoryUserRepository implements UserRepository {
  private users = new Map<string, Account>();

  async save(account: Account): Promise<void> {
    this.users.set(account.emailAddress, account);
  }

  async findByEmailAddress(emailAddress: string): Promise<Account> {
    return this.users.get(emailAddress);
  }

  async isEmailAddressAvailable(emailAddress: string): Promise<boolean> {
    if (this.users.get(emailAddress)) {
      return false;
    }

    return true;
  }
}

export class RegistrationCommand {
  constructor(
    public readonly emailAddress: string,
    public readonly password: string
  ) {}
}

export interface PasswordHasher {
  hash(password: string): Promise<string>;
  verify(hashedPassword: string, password: string): Promise<boolean>;
}

export class InmemoryPasswordHasher implements PasswordHasher {
  verify(password: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async hash(password: string): Promise<string> {
    return 'hashed-' + password;
  }
}

export class Argon2PasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password, {});
  }

  async verify(hashedPassword: string, password: string): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}

export class Registration {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async execute(command: RegistrationCommand) {
    const { emailAddress, password } = command;

    const isEmailAddressAvailable = await this.userRepository.isEmailAddressAvailable(emailAddress);

    if (this.isPasswordValid(password)) {
      throw new Error('Password is not safe enough');
    }

    if (!isEmailAddressAvailable) {
      throw new Error('Email address already exists');
    }

    const passwordHashed = await this.passwordHasher.hash(password);
    await this.userRepository.save({ emailAddress, password: passwordHashed });
  }

  private isPasswordValid(password: string) {
    return !/^(?=.*[A-Z])(?=.*\d).{5,}$/.test(password);
  }
}
