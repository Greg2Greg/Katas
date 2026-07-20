/*
  Example with pure FP with description of effect before exeution and without any helper, in a "native" instead of using a framework like Effect for pedagogical reasons.
  - value int Event should not be a needed payload, but its just to make the example with payload
  - an observer listens to an event and returns commands that are side-effectless
*/
type Command = { type: 'Log'; message: string };
type CounterEvent = { type: 'incremented'; value: number } | { type: 'decremented'; value: number };
type Observer<E> = (event: E) => Command[];
type SubscriptionId = number;
type CounterState = {
  value: number;
  subscriptionId: SubscriptionId;
  observers: Record<SubscriptionId, Observer<CounterEvent>>;
};
type Observable<S, E> = {
  subscribe: (
    state: S,
    observer: Observer<E>
  ) => {
    state: S;
    subscriptionId: SubscriptionId;
  };
  unsubscribe: (state: S, subscriptionId: SubscriptionId) => S;
};
type Counter = Observable<CounterState, CounterEvent> & {
  increment: (state: CounterState) => {
    state: CounterState;
    commands: Command[];
  };
  decrement: (state: CounterState) => {
    state: CounterState;
    commands: Command[];
  };
};

function createCounterState(): CounterState {
  return {
    value: 0,
    subscriptionId: 0,
    observers: {},
  };
}

/*
  defaultCounter is a concrete implementation of Counter record function. It is pure, has no
  state nor side-effects.

  Using closures to encapsulate notify. There are several ways to do it:
  - Using a non exported function in the module (file)
  - Using IIFE to create a closure and return the object with the methods
*/
/*
    calls each observer and returns effectless command, so no side-effects are produced
*/
/*
    An observer is a function that takes an event and returns an array of commands.
    Object.values takes the value and not the key. So it returns: an array of functions:
    [
      {(event) => [{type: 'Log', message: 'Observer 1: CounterState value is 1'}]},
      {(event) => [{type: 'Log', message: 'Observer 2: CounterState value is 1'}]},
    ]

    flatMap calls each function with the event and returns an array of commands:
    [
      {type: 'Log', message: 'Observer 1: CounterState value is 1'},
      {type: 'Log', message: 'Observer 2: CounterState value is 1'},
    ]

    Why not map instead of flatMap ? Map encapsulates the return value of each observer in an array, so it returns:
    [
      [{type: 'Log', message: 'Observer 1: CounterState value is 1'}],
      [{type: 'Log', message: 'Observer 2: CounterState value is 1'}],
    ]
*/
const defaultCounter: Counter = (() => {
  function notify(state: CounterState, event: CounterEvent): Command[] {
    return Object.values(state.observers).flatMap((observer) => observer(event));
  }

  return {
    subscribe: (state, observer) => {
      const subscriptionId = state.subscriptionId;

      return {
        subscriptionId,
        state: {
          ...state,
          subscriptionId: subscriptionId + 1,
          observers: {
            ...state.observers,
            [subscriptionId]: observer,
          },
        },
      };
    },
    unsubscribe: (state, subscriptionId) => {
      const { [subscriptionId]: _removed, ...observers } = state.observers;

      return {
        ...state,
        observers,
      };
    },
    increment: (state) => {
      const value = state.value + 1;

      const nextState: CounterState = {
        ...state,
        value,
      };

      const event: CounterEvent = {
        type: 'incremented',
        value,
      };

      return {
        state: nextState,
        commands: notify(nextState, event),
      };
    },
    decrement: (state) => {
      const value = state.value - 1;

      const nextState: CounterState = {
        ...state,
        value,
      };

      const event: CounterEvent = {
        type: 'decremented',
        value,
      };

      return {
        state: nextState,
        commands: notify(nextState, event),
      };
    },
  };
})();

async function interpret(command: Command): Promise<void> {
  switch (command.type) {
    case 'Log':
      console.log(command.message);
      break;
  }
}

const observer1: Observer<CounterEvent> = (event) => [
  {
    type: 'Log',
    message: `Observer 1: CounterState value is ${event.value}`,
  },
];

/*
  In a real application, we will have several entrypoints (test, HTTP controller, CLI command, Event Consumer, ...) that act as the imperative shell.
  Each context receives a request, calls the pure core and executes commands.

  Lot of boilerplate code is needed to execute commands, and its normal, we could create a helper to reduce boilerplate but its purely pedagocical here.
  There is no need to create its own helper, Effect framework handles it perfectly for Typescript.
*/
let state = createCounterState();

const subscribed = defaultCounter.subscribe(state, observer1);
state = subscribed.state;

let result = defaultCounter.increment(state);
state = result.state;
const incrementCommands = result.commands;

result = defaultCounter.decrement(state);
state = result.state;
const decrementCommands = result.commands;

state = defaultCounter.unsubscribe(state, subscribed.subscriptionId);

result = defaultCounter.increment(state);
state = result.state;
const incrementAfterUnsubscribeCommands = result.commands;

result = defaultCounter.decrement(state);
state = result.state;
const decrementAfterUnsubscribeCommands = result.commands;

const commands = [
  ...incrementCommands,
  ...decrementCommands,
  ...incrementAfterUnsubscribeCommands,
  ...decrementAfterUnsubscribeCommands,
];

(async () => {
  for (const command of commands) {
    await interpret(command);
  }
})();
