export const GAME_STATES = {
  HOME: "HOME",
  GAME: "GAME",
  SETTINGS: "SETTINGS",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
};

export const GAME_MODES = {
  NORMAL: "NORMAL",
  INVINCIBLE: "INVINCIBLE",
  TIME: "TIME",
  FOOD_FRENZY: "FOOD_FRENZY",
};

export const BOARD_SIZES = {
  MOBILE: 20,
  DEFAULT: 20,
};

export const FOOD_LIMITS = {
  20: 10,
  30: 15,
  40: 20,
};

export const TIME_LIMITS = {
  "3": 180,
  "5": 300,
  "10": 600,
};

export const MOBILE_CONTROLS = {
  BUTTONS: "BUTTONS",
  SWIPE: "SWIPE",
};

export const GAME_ORIENTATIONS = {
  PORTRAIT: "PORTRAIT",
  LANDSCAPE: "LANDSCAPE",
};

export const game = {
  screen: GAME_STATES.HOME,
  deviceType: null,
  mode: GAME_MODES.NORMAL,
  boardSize: BOARD_SIZES.DEFAULT,
  speed: "NORMAL",
  mobileControl: MOBILE_CONTROLS.BUTTONS,
  orientation: GAME_ORIENTATIONS.PORTRAIT,
  timeLimit: 3,
  timeRemaining: 0,
  winReason: null,
  score: 0,
  snake: [],
  foods: [],
  direction: "RIGHT",
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
  game.foods = [];
  game.direction = "RIGHT";
  game.timeRemaining = 0;
  game.winReason = null;
}
