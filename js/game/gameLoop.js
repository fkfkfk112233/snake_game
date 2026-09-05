import {
  game,
  GAME_STATES,
  setGameState,
  resetGameState,
} from "../state/gameState.js";

import { moveSnake, applySnakeMove, initializeSnake } from "./snake.js";

import { createFood } from "./food.js";

import {
  isWallCollision,
  isFoodCollision,
  isSelfCollision,
} from "./collision.js";

import { renderScreen } from "../ui/screenManager.js";
import { renderGame } from "../ui/gameRenderer.js";

import {
  lockGameOrientation,
  unlockGameOrientation,
} from "../input/orientationController.js";

let gameTimer = null;

export async function startGame() {
  // 避免重複建立遊戲計時器
  stopGame();

  // 重置上一局遊戲資料
  resetGameState();

  // 建立新的 Snake 與 Food
  initializeGame();

  setGameState(GAME_STATES.GAME);

  renderScreen();
  renderGame();

  // 嘗試套用玩家設定的遊戲方向
  await lockGameOrientation();

  gameTimer = setInterval(updateGame, getGameSpeed());
}

function initializeGame() {
  initializeSnake();

  createFood();
}

function updateGame() {
  if (game.screen !== GAME_STATES.GAME) {
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

export function endGame() {
  stopGame();

  unlockGameOrientation();

  setGameState(GAME_STATES.GAME_OVER);

  document.getElementById("finalScore").textContent = game.score;

  renderScreen();
}

export function stopGame() {
  if (gameTimer !== null) {
    clearInterval(gameTimer);

    gameTimer = null;
  }
}

// =========================
// 遊戲速度
// =========================

function getGameSpeed() {
  if (game.speed === "SLOW") {
    return 300;
  }

  if (game.speed === "FAST") {
    return 75;
  }

  return 150;
}
