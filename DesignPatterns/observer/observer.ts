/* 
    - Source / Publisher / Subject / Observable : object that emits events.
    - Subscriber / Observer : object that subscribes to events.
    - When an event occurs, all subscribers are notified.

    Be careful :
    -   There should be no public "notify" method in publisher, otherwise the publisher can be easily misused. Better have a 
        public method with a specific business name that internally calls the private "notify" method. 

    -   Use a set to avoid duplicate subscribers, set unicity is based on reference equality.

    Observer in-process, synchronous and push-based. The publisher pushes the event to the subscribers when it occurs. The subscribers are notified synchronously, in the same order as they subscribed. Observer pattern is the "basic" implementation of publish-subscribe also used in message brokers, event buses, reactive programming, etc. In these more complex implementations, the publisher and subscribers can be in different processes, machines or even datacenters. The events can be buffered and delivered asynchronously, and the subscribers can pull the events instead of being pushed.

    It is still usable in code, for example in domain event, that are handled in-process via Observer pattern. An aggregate emits domain event, than separate handlers can react before, including one that can persist / publish event on an external message broker. But many times, you will use external libraries that implement publish-subscribe, for example RxJS in frontend, or message brokers like RabbitMQ, Kafka, etc. in backend. In these cases, you will not implement the Observer pattern yourself, but you will use the library's API to publish and subscribe to events.
*/

export type SubscriberParams<P, M> = {
  payload: P;
  metadata: M;
};

export interface Subscriber<P, M> {
  update(params: SubscriberParams<P, M>): void;
}

export interface Publisher<P, M> {
  subscribe(subscriber: Subscriber<P, M>): void;
  unsubscribe(subscriber: Subscriber<P, M>): void;
}
