/*
  An higher object will get a reference to an object of the second hierarchy. The higher object will be able to delegate some of its calls to the implementations object. Since all implementations will have a common interface, they’d be interchangeable inside the abstraction.

  It has to be 2 dimensions that vary independently. Here Device and Remote are the 2 dimensions. Without the bridge pattern, we’d have to create a class for each combination of device and remote. With the bridge pattern, we can create a single RemoteControl class that can work with any Device implementation.
*/
export type DeviceStatus = {
  name: string;
  enabled: boolean;
  volume: number;
  channel: number;
};

export interface Device {
  enable(): void;
  disable(): void;
  isEnabled(): boolean;
  getVolume(): number;
  setVolume(volume: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
  status(): DeviceStatus;
}

export interface Remote {
  togglePower(): void;
  volumeUp(): void;
  volumeDown(): void;
  channelUp(): void;
  channelDown(): void;
}

export class RemoteControl implements Remote {
  constructor(private readonly device: Device) {}

  togglePower(): void {
    if (this.device.isEnabled()) {
      this.device.disable();
      return;
    }

    this.device.enable();
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }
}

export class AdvancedRemoteControl implements Remote {
  private readonly remote: RemoteControl;

  constructor(private readonly device: Device) {
    this.remote = new RemoteControl(device);
  }

  togglePower(): void {
    this.remote.togglePower();
  }

  volumeUp(): void {
    this.remote.volumeUp();
  }

  volumeDown(): void {
    this.remote.volumeDown();
  }

  channelUp(): void {
    this.remote.channelUp();
  }

  channelDown(): void {
    this.remote.channelDown();
  }

  mute(): void {
    this.device.setVolume(0);
  }
}

export class Tv implements Device {
  private enabled = false;
  private volume = 30;
  private channel = 1;

  enable(): void {
    this.enabled = true;
  }

  disable(): void {
    this.enabled = false;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(volume: number): void {
    this.volume = clamp(volume, 0, 100);
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = Math.max(1, channel);
  }

  status(): DeviceStatus {
    return {
      name: 'TV',
      enabled: this.enabled,
      volume: this.volume,
      channel: this.channel,
    };
  }
}

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);
