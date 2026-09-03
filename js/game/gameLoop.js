import { game, GAME_STATES, setGameState, resetGameState } from "../state/gameState.js";

import { moveSnake, applySnakeMove, initializeSnake } from "./snake.js";

import { createFood } from "./food.js";

import {
  isWallCollision,
  isFoodCollision,
  isSelfCollision,
} from "./collision.js";

import { renderScreen } from "../ui/screenManager.js";
import { renderGame } from "../ui/gameRenderer.js";

let gameTimer = null;

export function startGame() {
  // 避免重複建立遊戲計時器
  stopGame();

  game.score = 0;
  game.direction = "RIGHT";
  game.gameOver = false;

  resetGameState();

  initializeGame();

  setGameState(GAME_STATES.GAME);
  renderScreen();

  renderGame();

  gameTimer = setInterval(updateGame, 150);
}

function initializeGame() {
  initializeSnake();

  createFood();
}

function updateGame() {
  if (game.gameOver) {
    return;
  }

  // 計算蛇下一個位置
  const newHead = moveSnake();

  // =========================
  // 撞牆
  // =========================

  if (isWallCollision(newHead)) {
    // 普通模式 → Game Over
    if (game.mode === "NORMAL") {
      endGame();
      return;
    }

    // 無敵模式 → 停在原地
    renderGame();

    return;
  }

  // =========================
  // 撞自己
  // =========================

  if (game.mode === "NORMAL" && isSelfCollision(newHead)) {
    endGame();
    return;
  }

  // =========================
  // 實際移動蛇
  // =========================

  applySnakeMove(newHead);

  // =========================
  // 吃食物
  // =========================

  if (isFoodCollision(newHead)) {
    game.score += 10;

    createFood();
  } else {
    // 沒吃到食物 → 移除尾巴
    game.snake.pop();
  }

  // =========================
  // 更新畫面
  // =========================

  renderGame();
}

function endGame() {
  game.gameOver = true;

  stopGame();

  document.getElementById("finalScore").textContent = game.score;

  setGameState(GAME_STATES.GAME_OVER);

  renderScreen();
}

export function stopGame() {
  if (gameTimer !== null) {
    clearInterval(gameTimer);

    gameTimer = null;
  }
}
