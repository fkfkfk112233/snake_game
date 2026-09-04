import {
  game,
  GAME_STATES,
  MOBILE_CONTROLS,
} from "../state/gameState.js";

import { DEVICE_TYPES } from "../device/deviceDetector.js";

import { changeDirection } from "./directionController.js";

let startX = 0;
let startY = 0;

// ====================
// Swipe Settings
// ====================

// Swipe 最小判定距離。
// 即使滑動距離很短，也至少需要達到這個距離才會判定為 Swipe。
const MIN_SWIPE_THRESHOLD = 20;

// Swipe 最大判定距離。
// 避免大螢幕裝置因為比例計算而需要滑動太遠。
const MAX_SWIPE_THRESHOLD = 50;

// Swipe 判定比例。
// 使用螢幕較短的一邊 × 這個比例來計算 Swipe 距離。
//
// 例如：
// 螢幕短邊 375px
// 375 × 0.08 = 30px
//
// 想讓 Swipe 更容易觸發 → 調小這個值
// 想讓 Swipe 更不容易誤觸 → 調大這個值
const SWIPE_RATIO = 0.08;

export function initializeTouchInput() {
  const gameScreen = document.getElementById("gameScreen");

  if (!gameScreen) {
    return;
  }

  // 開始觸控時，記錄手指起始位置
  gameScreen.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });

  // 手指離開螢幕時，計算滑動方向
  gameScreen.addEventListener("touchend", handleTouchEnd, {
    passive: true,
  });
}

function handleTouchStart(event) {
  // 只有正在遊戲中時才處理 Swipe
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  // Swipe 操作只在手機裝置啟用
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  // 只有玩家選擇 Swipe 控制時才處理
  if (game.mobileControl !== MOBILE_CONTROLS.SWIPE) {
    return;
  }

  const touch = event.changedTouches[0];

  // 記錄手指開始觸控的位置
  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchEnd(event) {
  // 只有正在遊戲中時才處理 Swipe
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  // Swipe 操作只在手機裝置啟用
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  // 只有玩家選擇 Swipe 控制時才處理
  if (game.mobileControl !== MOBILE_CONTROLS.SWIPE) {
    return;
  }

  const touch = event.changedTouches[0];

  // 取得手指結束位置
  const endX = touch.clientX;
  const endY = touch.clientY;

  // 計算 X / Y 方向的位移
  const deltaX = endX - startX;
  const deltaY = endY - startY;

  // 取得位移的絕對值，用來比較水平或垂直移動較大
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  // 根據目前裝置尺寸計算 Swipe 判定距離
  const swipeThreshold = getSwipeThreshold();

  // 如果滑動距離太短，視為沒有 Swipe
  if (Math.max(absX, absY) < swipeThreshold) {
    return;
  }

  // X 位移比較大 → 判定為水平滑動
  if (absX > absY) {
    if (deltaX > 0) {
      changeDirection("RIGHT");
    } else {
      changeDirection("LEFT");
    }
  }
  // Y 位移比較大 → 判定為垂直滑動
  else {
    if (deltaY > 0) {
      changeDirection("DOWN");
    } else {
      changeDirection("UP");
    }
  }
}

// ====================
// Swipe Threshold
// ====================

// 根據裝置螢幕尺寸動態計算 Swipe 判定距離。
//
// 使用 width / height 中較小的數值，
// 避免手機直向或橫向時產生過大的 Threshold。
function getSwipeThreshold() {
  const screenSize = Math.min(
    window.innerWidth,
    window.innerHeight,
  );

  // 將計算結果限制在 MIN ～ MAX 之間。
  return Math.max(
    MIN_SWIPE_THRESHOLD,
    Math.min(screenSize * SWIPE_RATIO, MAX_SWIPE_THRESHOLD),
  );
}