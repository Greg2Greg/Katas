/* 
  Adding new behavior will just need to add new function
  But, unlike FP, adding a new implementation (state here) is easier

  FP = group variant by behavior. So if new behavior, just create a new function. But if new variant (state), need to add it in all functions.
*/
type PlayerState = 'paused' | 'playing';
type Player = {
  state: PlayerState;
};

function play(player: Player): Player {
  switch (player.state) {
    case 'paused':
      console.log('Playing music.');
      return { state: 'playing' };

    case 'playing':
      console.log('Music is already playing.');
      return player;
  }
}

function pause(player: Player): Player {
  switch (player.state) {
    case 'paused':
      console.log('Music is already paused.');
      return player;

    case 'playing':
      console.log('Music paused.');
      return { state: 'paused' };
  }
}

function cancel(player: Player): Player {
  switch (player.state) {
    default:
      console.log('You cancelled the music.');
      return player;
  }
}

let player: Player = {
  state: 'paused',
};

player = play(player);
player = pause(player);
cancel(player);
