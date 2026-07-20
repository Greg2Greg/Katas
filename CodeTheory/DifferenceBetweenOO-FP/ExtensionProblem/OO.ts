/* 
  Adding new behavior here will need to modify all implementations of the PlayerState interface
  But, unlike FP, adding a new implementation (state here) is easier

  OO = group behavior by variant. So if new behavior, need to add it in all variants. But if new variant (state),
  just create a new one (new class)

  Try to add new behavior / variant to see the difference !
*/
interface PlayerState {
  play(player: Player): void;
  pause(player: Player): void;
  cancel(player: Player): void;
}

class Player {
  constructor(private state: PlayerState) {}

  setState(state: PlayerState): void {
    this.state = state;
  }

  play(): void {
    this.state.play(this);
  }

  pause(): void {
    this.state.pause(this);
  }

  cancel(): void {
    this.state.cancel(this);
  }
}

class PausedState implements PlayerState {
  play(player: Player): void {
    player.setState(new PlayingState());
    console.log('Playing music.');
  }

  pause(player: Player): void {
    console.log('Music is already paused.');
  }

  cancel(player: Player): void {
    console.log('You cancelled the music.');
  }
}

class PlayingState implements PlayerState {
  play(player: Player): void {
    console.log('Music is already playing.');
  }

  pause(player: Player): void {
    player.setState(new PausedState());
    console.log('Music paused.');
  }

  cancel(player: Player): void {
    console.log('You cancelled the music.');
  }
}

const player = new Player(new PausedState());
player.play();
player.pause();
