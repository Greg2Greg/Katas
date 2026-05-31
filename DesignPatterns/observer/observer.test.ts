import { describe, expect, it } from 'vitest';
import { InternalRepository } from './real-subscriber.ts';
import { NaiveWeatherStation } from './weather-station.ts';

describe('Observer Pattern', () => {
  it("should notify observers when the subject's state changes", () => {
    const weatherStationStrasbourg = new NaiveWeatherStation('strasbourg-67');
    const weatherStationParis = new NaiveWeatherStation('paris-75');

    const internalRepository = new InternalRepository();

    weatherStationStrasbourg.subscribe(internalRepository);
    weatherStationParis.subscribe(internalRepository);

    weatherStationStrasbourg.updateMeasurements({ temperature: 20, humidity: 80, wind: 10 }, '11/02/1998');
    weatherStationParis.updateMeasurements({ temperature: 25, humidity: 60, wind: 5 }, '12/02/1998');

    expect(internalRepository['payloadHistory']).toEqual([
      {
        payload: { temperature: 20, humidity: 80, wind: 10 },
        metadata: { sentAt: '11/02/1998', stationId: 'strasbourg-67' },
      },
      {
        payload: { temperature: 25, humidity: 60, wind: 5 },
        metadata: { sentAt: '12/02/1998', stationId: 'paris-75' },
      },
    ]);
  });
});
