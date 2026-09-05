import {
  game,
  GAME_STATES,
  GAME_MODES,
  TIME_LIMITS,
  setGameState,
  resetGameState,
} from "../state/gameState.js";

import { moveSnake, applySnakeMove, initializeSnake } from "./snake.js";

import {
  createFood,
  removeFoodAt,
  getFoodIndexAt,
  getFoodLimitForCurrentMode,
} from "./food.js";

import {
  isWallCollision,
  getFoodCollisionIndex,
  isSelfCollision,
} from "./collision.js";

import { renderScreen } from "../ui/screenManager.js";
import { renderGame } from "../ui/gameRenderer.js";

import {
  lockGameOrientation,
  unlockGameOrientation,
} from "../input/orientationController.js";

let gameTimer = null;
let timeTimer = null;
let foodTimer = null;
let startingGame = false;
let timeEndAt = null;

export async function startGame() {
  if (startingGame) {
    return;
  }

  startingGame = true;

  stopGame();
  resetGameState();
  initializeGame();

  setGameState(GAME_STATES.GAME);

  if (game.mode === GAME_MODES.TIME) {
    game.timeRemaining = TIME_LIMITS[String(game.timeLimit)] ?? TIME_LIMITS["3"];
    timeEndAt = Date.now() + game.timeRemaining * 1000;
  }

  renderScreen();
  renderGame();

  try {
    await lockGameOrientation();

    if (game.screen !== GAME_STATES.GAME) {
      return;
    }

    gameTimer = setInterval(updateGame, getGameSpeed());

    if (game.mode === GAME_MODES.TIME) {
      timeTimer = setInterval(updateTime, 250);
    }

    if (game.mode === GAME_MODES.FOOD_FRENZY) {
      foodTimer = setInterval(spawnFrenzyFood, 3000);
    }
  } finally {
    startingGame = false;
  }
}

function initializeGame() {
  initializeSnake();

  // 所有模式至少從一個 Food 開始。
  createFood();
}

function updateGame() {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  const newHead = moveSnake();

  if (isWallCollision(newHead)) {
    if (game.mode !== GAME_MODES.INVINCIBLE) {
      endGame();
      return;
    }

    renderGame();
    return;
  }

  if (game.mode !== GAME_MODES.INVINCIBLE && isSelfCollision(newHead)) {
    endGame();
    return;
  }

  applySnakeMove(newHead);

  const foodIndex = getFoodIndexAt(newHead);

  if (foodIndex !== -1) {
    game.score += 10;
    removeFoodAt(foodIndex);

    // 吃到 Food 後立即補一個。
    createFood();
  } else {
    game.snake.pop();
  }

  // Snake 填滿整個棋盤即 WIN。
  if (game.snake.length >= game.boardSize * game.boardSize) {
    winGame("BOARD_COMPLETE");
    return;
  }

  renderGame();
}

function spawnFrenzyFood() {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  if (game.mode !== GAME_MODES.FOOD_FRENZY) {
    return;
  }

  if (game.foods.length < getFoodLimitForCurrentMode()) {
    createFood();
    renderGame();
  }
}

function updateTime() {
  if (game.screen !== GAME_STATES.GAME || game.mode !== GAME_MODES.TIME) {
    return;
  }

  game.timeRemaining = Math.max(0, Math.ceil((timeEndAt - Date.now()) / 1000));

  if (game.timeRemaining <= 0) {
    game.timeRemaining = 0;
    winGame("TIME_UP");
    return;
  }

  renderGame();
}

export function endGame() {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  stopGame();
  unlockGameOrientation();

  setGameState(GAME_STATES.GAME_OVER);

  document.getElementById("finalScore").textContent = game.score;
  document.getElementById("resultTitle").textContent = "GAME OVER";
  document.getElementById("resultMessage").textContent = "遊戲結束";

  renderScreen();
}

export function winGame(reason = "BOARD_COMPLETE") {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  stopGame();
  unlockGameOrientation();

  game.winReason = reason;
  setGameState(GAME_STATES.WIN);

  document.getElementById("finalScore").textContent = game.score;
  const winMessage = reason === "TIME_UP" ? "時間結束" : "棋盤已填滿";

  document.getElementById("winFinalScore").textContent = game.score;
  document.getElementById("winTitle").textContent = "YOU WIN!";
  document.getElementById("winMessage").textContent = winMessage;

  renderScreen();
}

export function stopGame() {
  if (gameTimer !== null) {
    clearInterval(gameTimer);
    gameTimer = null;
  }

  if (timeTimer !== null) {
    clearInterval(timeTimer);
    timeTimer = null;
  }

  if (foodTimer !== null) {
    clearInterval(foodTimer);
    foodTimer = null;
  }

  timeEndAt = null;
}

function getGameSpeed() {
  if (game.speed === "SLOW") {
    return 300;
  }

  if (game.speed === "FAST") {
    return 75;
  }

  return 150;
}
