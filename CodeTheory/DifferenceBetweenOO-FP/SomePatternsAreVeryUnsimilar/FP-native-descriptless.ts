type CounterEvent = { type: 'incremented'; value: number } | { type: 'decremented'; value: number };
type Observer<E> = (event: E) => void;
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
  increment: (state: CounterState) => CounterState;
  decrement: (state: CounterState) => CounterState;
};

function createCounterState(): CounterState {
  return {
    value: 0,
    subscriptionId: 0,
    observers: {},
  };
}

const defaultCounter: Counter = (() => {
  /*
    Unlike descriptful version, notify directly executes observers.
    So if an observer does console.log, sendEmail, writeDB, etc.,
    the effect happens immediately here.
  */
  function notify(state: CounterState, event: CounterEvent): void {
    Object.values(state.observers).forEach((observer) => {
      observer(event);
    });
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

      notify(nextState, event);

      return nextState;
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

      notify(nextState, event);

      return nextState;
    },
  };
})();

const observer1: Observer<CounterEvent> = (event) => {
  console.log(`Observer 1: CounterState value is ${event.value}`);
};

let state = createCounterState();

const subscribed = defaultCounter.subscribe(state, observer1);
state = subscribed.state;
state = defaultCounter.increment(state);
state = defaultCounter.decrement(state);
state = defaultCounter.unsubscribe(state, subscribed.subscriptionId);
state = defaultCounter.increment(state);
state = defaultCounter.decrement(state);
