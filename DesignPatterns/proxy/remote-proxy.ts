export type Location = Readonly<{
  city: string;
  latitude: number;
  longitude: number;
}>;

export type Price = Readonly<{
  amountInCents: number;
  currency: 'EUR';
}>;

export type PriceRequest = Readonly<{
  departure: Location;
  arrival: Location;
  distanceInKm: number;
}>;

export type PlanTripInput = PriceRequest;

export type PlannedTrip = Readonly<{
  departure: Location;
  arrival: Location;
  distanceInKm: number;
  price: Price;
}>;

// Bounded Context: trip planning.
// It owns the interface it needs and does not know where pricing actually lives.
export interface RoutePricingGateway {
  calculatePrice(input: PriceRequest): Promise<Price>;
}

export class PlanTripUseCase {
  constructor(private readonly pricingGateway: RoutePricingGateway) {}

  async execute(input: PlanTripInput): Promise<PlannedTrip> {
    const price = await this.pricingGateway.calculatePrice(input);

    return {
      departure: input.departure,
      arrival: input.arrival,
      distanceInKm: input.distanceInKm,
      price,
    };
  }
}

// Bounded Context: pricing.
// In a real app, this could move from a local package to another deployable component.
export interface RoutePricingEngine {
  calculate(input: PriceRequest): Price;
}

export class DistanceBasedRoutePricingEngine implements RoutePricingEngine {
  constructor(private readonly centsPerKm: number) {}

  calculate(input: PriceRequest): Price {
    return {
      amountInCents: Math.round(input.distanceInKm * this.centsPerKm),
      currency: 'EUR',
    };
  }
}

// Infrastructure proxy: direct in-process communication.
export class DirectRoutePricingProxy implements RoutePricingGateway {
  constructor(private readonly pricingEngine: RoutePricingEngine) {}

  async calculatePrice(input: PriceRequest): Promise<Price> {
    return this.pricingEngine.calculate(input);
  }
}

export type HttpClient = (
  url: string,
  init: {
    method: 'POST';
    headers: Record<string, string>;
    body: string;
  }
) => Promise<{
  ok: boolean;
  json(): Promise<Price>;
}>;

// Infrastructure proxy: remote communication over HTTP (pricing engine is hidden)
export class HttpRoutePricingProxy implements RoutePricingGateway {
  constructor(
    private readonly baseUrl: string,
    private readonly httpClient: HttpClient = fetch
  ) {}

  async calculatePrice(input: PriceRequest): Promise<Price> {
    const response = await this.httpClient(`${this.baseUrl}/route-prices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Cannot calculate route price.');
    }

    return response.json();
  }
}

export type PricingCommunicationMode = 'direct' | 'http';

export type RoutePricingGatewayConfig =
  | Readonly<{
      mode: 'direct';
      centsPerKm: number;
    }>
  | Readonly<{
      mode: 'http';
      pricingServiceUrl: string;
      httpClient?: HttpClient;
    }>;

// Composition root.
// Only this infrastructure wiring changes when the pricing module moves away.
export function createRoutePricingGateway(config: RoutePricingGatewayConfig): RoutePricingGateway {
  if (config.mode === 'direct') {
    return new DirectRoutePricingProxy(new DistanceBasedRoutePricingEngine(config.centsPerKm));
  }

  return new HttpRoutePricingProxy(config.pricingServiceUrl, config.httpClient);
}
