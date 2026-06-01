export interface Beverage {
  description(): string;
  price(): number;
}

export class Espresso implements Beverage {
  description(): string {
    return 'Espresso';
  }

  price(): number {
    return 2;
  }
}

export class MilkDecorator implements Beverage {
  constructor(private readonly beverage: Beverage) {}

  description(): string {
    return `${this.beverage.description()}, milk`;
  }

  price(): number {
    return this.beverage.price() + 0.5;
  }
}

export class SugarDecorator implements Beverage {
  constructor(private readonly beverage: Beverage) {}

  description(): string {
    return `${this.beverage.description()}, sugar`;
  }

  price(): number {
    return this.beverage.price() + 0.2;
  }
}

export class WhippedCreamDecorator implements Beverage {
  constructor(private readonly beverage: Beverage) {}

  description(): string {
    return `${this.beverage.description()}, whipped cream`;
  }

  price(): number {
    return this.beverage.price() + 0.8;
  }
}

export class CashRegister {
  checkout(beverage: Beverage): { description: string; price: number } {
    return {
      description: beverage.description(),
      price: beverage.price(),
    };
  }
}
