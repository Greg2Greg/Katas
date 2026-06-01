export interface OrderComponent {
  getPrice(): number;
}

export class Product implements OrderComponent {
  constructor(
    private readonly name: string,
    private readonly price: number
  ) {}

  getPrice(): number {
    return this.price;
  }

  getName(): string {
    return this.name;
  }
}

export class Box implements OrderComponent {
  private readonly children: OrderComponent[] = [];

  constructor(
    private readonly name: string,
    private readonly packagingPrice = 0
  ) {}

  add(component: OrderComponent): Box {
    this.children.push(component);
    return this;
  }

  remove(componentToRemove: OrderComponent): Box {
    const index = this.children.indexOf(componentToRemove);

    if (index >= 0) {
      this.children.splice(index, 1);
    }

    return this;
  }

  getPrice(): number {
    return this.children.reduce((total, component) => total + component.getPrice(), this.packagingPrice);
  }

  getName(): string {
    return this.name;
  }

  getChildren(): readonly OrderComponent[] {
    return this.children;
  }
}

/*
    The Composite pattern allows us to treat individual objects and compositions of objects uniformly. In this example, both `Product` and `Box` implement the `OrderComponent` interface, allowing to calculate the total price of an order regardless of whether it consists of individual products or boxes containing multiple products. The `Checkout` class can then use the `getPrice()` method to calculate the total price of the order without needing to know the specific details of how the order is structured.

    Consumer is independent of the tree hierarchy - recursivity is handle by component themselves. "Composite is used when a part or a whole should be treated the same way."
*/
export class Checkout {
  constructor(private readonly order: OrderComponent) {}

  totalPrice(): number {
    return this.order.getPrice();
  }
}
