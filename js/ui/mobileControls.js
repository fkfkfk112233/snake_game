import {
  game,
  GAME_STATES,
  MOBILE_CONTROLS,
} from "../state/gameState.js";

import { DEVICE_TYPES } from "../device/deviceDetector.js";

import { changeDirection } from "../input/directionController.js";

export function initializeMobileControls() {
  const upButton = document.getElementById("upButton");
  const downButton = document.getElementById("downButton");
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");

  if (!upButton || !downButton || !leftButton || !rightButton) {
    return;
  }

  upButton.addEventListener("click", () => {
    if (!canUseMobileControls()) {
      return;
    }

    changeDirection("UP");
  });

  downButton.addEventListener("click", () => {
    if (!canUseMobileControls()) {
      return;
    }

    changeDirection("DOWN");
  });

  leftButton.addEventListener("click", () => {
    if (!canUseMobileControls()) {
      return;
    }

    changeDirection("LEFT");
  });

  rightButton.addEventListener("click", () => {
    if (!canUseMobileControls()) {
      return;
    }

    changeDirection("RIGHT");
  });
}

function canUseMobileControls() {
  if (game.screen !== GAME_STATES.GAME) {
    return false;
  }

  // Desktop 不允許使用 Mobile Button
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return false;
  }

  // 只有 Button 模式可以使用
  if (game.mobileControl !== MOBILE_CONTROLS.BUTTONS) {
    return false;
  }

  return true;
}

export function updateMobileControls() {
  const mobileControls = document.getElementById("mobileControls");

  if (!mobileControls) {
    return;
  }

  // Desktop 永遠不顯示
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    mobileControls.style.display = "none";
    return;
  }

  // Mobile + Button
  if (game.mobileControl === MOBILE_CONTROLS.BUTTONS) {
    mobileControls.style.display = "flex";
    return;
  }

  // Mobile + Swipe
  mobileControls.style.display = "none";
}