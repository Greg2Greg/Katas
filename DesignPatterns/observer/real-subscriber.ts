import { SubscriberParams } from './observer.ts';
import {
  WeatherStationSubscriber,
  WeatherStationPayload,
  WeatherStationMetadata,
} from './weather-station.ts';

export class InternalRepository implements WeatherStationSubscriber {
  private payloadHistory: SubscriberParams<WeatherStationPayload, WeatherStationMetadata>[] = [];

  update(params: SubscriberParams<WeatherStationPayload, WeatherStationMetadata>): void {
    this.payloadHistory.push(params);
  }
}
