type SubscriptionId = string;
interface Observer {
  update(value: number): void;
}
interface Observable {
  subscribe(observer: Observer): SubscriptionId;
  unsubscribe(subscriptionId: SubscriptionId): void;
}

class Counter implements Observable {
  private observers: Map<SubscriptionId, Observer> = new Map();
  private value = 0;
  private nextSubscriptionId = 1;

  subscribe(observer: Observer): SubscriptionId {
    const subscriptionId = `subscription-${this.nextSubscriptionId}`;

    this.nextSubscriptionId++;
    this.observers.set(subscriptionId, observer);

    return subscriptionId;
  }

  unsubscribe(subscriptionId: SubscriptionId): void {
    this.observers.delete(subscriptionId);
  }

  increment(): void {
    this.value++;
    this.notify();
  }

  decrement(): void {
    this.value--;
    this.notify();
  }

  private notify(): void {
    for (const observer of this.observers.values()) {
      observer.update(this.value);
    }
  }
}

const counter = new Counter();

const observer1: Observer = {
  update(value: number): void {
    console.log(`Observer 1: Counter value is ${value}`);
  },
};

const subscriptionId = counter.subscribe(observer1);
counter.increment();
counter.decrement();
counter.unsubscribe(subscriptionId);
counter.increment();
counter.decrement();
