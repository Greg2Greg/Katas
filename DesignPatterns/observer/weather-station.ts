import { Publisher, Subscriber, SubscriberParams } from './observer.ts';

export type WeatherStationSubscriber = Subscriber<WeatherStationPayload, WeatherStationMetadata>;
export type WeatherStationPayload = { temperature: number; humidity: number; wind: number };
export type WeatherStationMetadata = { sentAt: string; stationId: string };
type WeatherStationPublisher = Publisher<WeatherStationPayload, WeatherStationMetadata>;

export class NaiveWeatherStation implements WeatherStationPublisher {
  constructor(private readonly stationId: string) {}

  private subscribers: Set<WeatherStationSubscriber> = new Set();

  subscribe(subscriber: WeatherStationSubscriber): void {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: WeatherStationSubscriber): void {
    this.subscribers.delete(subscriber);
  }

  updateMeasurements(payload: WeatherStationPayload, date: string): void {
    const metadata: WeatherStationMetadata = { sentAt: date, stationId: this.stationId };
    this.notify({ payload, metadata });
  }

  private notify(params: SubscriberParams<WeatherStationPayload, WeatherStationMetadata>): void {
    this.subscribers.forEach((subscriber) =>
      subscriber.update({ metadata: params.metadata, payload: params.payload })
    );
  }
}
