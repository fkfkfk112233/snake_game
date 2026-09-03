export const GAME_STATES = {
  HOME: "HOME",
  GAME: "GAME",
  SETTINGS: "SETTINGS",
  GAME_OVER: "GAME_OVER",
};

export const game = {
  screen: GAME_STATES.HOME,

  mode: "NORMAL",

  boardSize: 30,

  score: 0,

  snake: [],

  food: {
    x: 0,
    y: 0,
  },

  direction: "RIGHT",

  gameOver: false,
};

export function setGameState(newState) {
  game.screen = newState;
}

export function getGameState() {
  return game.screen;
}
