/*
    When using Effect, we can see that FP does not mean no state, but : 
        - no uncontrolled side-effect
        - no arbitraty mutation
        - effects described as values
        - execution controlled by a runtime
        - explicit composition
        - typed dependencies and errors
        - resources with controlled lifetime.
*/
/*
    With Effect, we build a description of a program as an Effect. It will allocate Ref / PubSub only once executed via runSync / runPromise, so there is a big difference:
        - new Counter() => creates immediately a new mutable object
        - makeCounter => describe how to create an effectless Counter that can be interpreted later (lazy evaluation)

    So makeCounter looks like OO because internal state. But in reality, it is a concrete implementation of a Counter record function, that produces no effect when called, Effect will be produced when the runtime will interpret it.

    Careful: 
     const logNow = (): Effect.Effect<void> => {
        console.log("I run now");                   => if not returning => eager 
        return Console.log("I run later");          => return an Effect => lazy 
    }
*/
import { Console, Effect, PubSub, Queue, Ref } from 'effect';

type CounterEvent =
  | { type: 'CounterIncremented'; value: number }
  | { type: 'CounterDecremented'; value: number };

type Counter = {
  increment: Effect.Effect<void>;
  decrement: Effect.Effect<void>;
  events: PubSub.PubSub<CounterEvent>;
};
type Observer = (event: CounterEvent) => Effect.Effect<void>;

const makeCounter: Effect.Effect<Counter> = Effect.gen(function* () {
  const valueRef = yield* Ref.make(0);
  const events = yield* PubSub.bounded<CounterEvent>(16);

  const publishEvent = (event: CounterEvent): Effect.Effect<void> =>
    PubSub.publish(events, event).pipe(Effect.asVoid);

  const update = (
    computeNextValue: (value: number) => number,
    makeEvent: (value: number) => CounterEvent
  ): Effect.Effect<void> =>
    Effect.gen(function* () {
      const currentValue = yield* Ref.get(valueRef);
      const nextValue = computeNextValue(currentValue);

      yield* Ref.set(valueRef, nextValue);
      yield* publishEvent(makeEvent(nextValue));
    });

  return {
    increment: update(
      (value) => value + 1,
      (value) => ({
        type: 'CounterIncremented',
        value,
      })
    ),

    decrement: update(
      (value) => value - 1,
      (value) => ({
        type: 'CounterDecremented',
        value,
      })
    ),

    events,
  };
});

const observer1: Observer = (event) => Console.log(`Observer 1: Counter value is ${event.value}`);

const observer2: Observer = (event) => Console.log(`Observer 2 received event: ${event.type}`);

const runObserver = (subscription: Queue.Dequeue<CounterEvent>, observer: Observer): Effect.Effect<never> =>
  Effect.forever(
    Effect.gen(function* () {
      const event = yield* Queue.take(subscription);
      yield* observer(event);
    })
  );

const program = Effect.scoped(
  Effect.gen(function* () {
    const counter = yield* makeCounter;

    const subscription1 = yield* PubSub.subscribe(counter.events);
    const subscription2 = yield* PubSub.subscribe(counter.events);

    yield* Effect.forkScoped(runObserver(subscription1, observer1));
    yield* Effect.forkScoped(runObserver(subscription2, observer2));

    yield* counter.increment;
    yield* counter.decrement;
  })
);

Effect.runPromise(program);
