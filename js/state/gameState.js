export const GAME_STATES = {
  HOME: "HOME",
  GAME: "GAME",
  SETTINGS: "SETTINGS",
  GAME_OVER: "GAME_OVER",
};

export const BOARD_SIZES = {
  MOBILE: 20,
  DEFAULT: 30,
};

export const game = {
  screen: GAME_STATES.HOME,

  deviceType: null,

  mode: "NORMAL",

  boardSize: BOARD_SIZES.DEFAULT,

  speed: "NORMAL",

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

export function resetGameState() {
  game.score = 0;
  game.snake = [];
  game.food = {
    x: 0,
    y: 0,
  };
  game.direction = "RIGHT";
  game.gameOver = false;
}
