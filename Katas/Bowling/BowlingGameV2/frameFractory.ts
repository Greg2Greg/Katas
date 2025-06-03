import { ClassicFrame } from './classicFrame.ts';
import { IFrameObserver, IFrameObservable } from './models.ts';
import { TenthFrame } from './tenthFrame.ts';

export class FrameFactory {
  static readonly MAX_FRAMES = 10;

  createFrame(args: { frameIndex: number; observer: IFrameObserver }): IFrameObservable {
    const { frameIndex, observer } = args;

    const frame = this.createNextFrame(frameIndex);
    frame.attach(observer);
    return frame;
  }

  createNextFrame(frameIndex: number): IFrameObservable {
    if (frameIndex === FrameFactory.MAX_FRAMES - 1) {
      return new TenthFrame();
    }
    return new ClassicFrame();
  }
}
