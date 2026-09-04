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

  upButton.addEventListener("click", () => handleButtonDirection("UP"));

  downButton.addEventListener("click", () => handleButtonDirection("DOWN"));

  leftButton.addEventListener("click", () => handleButtonDirection("LEFT"));

  rightButton.addEventListener("click", () => handleButtonDirection("RIGHT"));
}

function handleButtonDirection(direction) {
  if (!canUseMobileControls()) {
    return;
  }

  changeDirection(direction);
}

function canUseMobileControls() {
  return (
    game.screen === GAME_STATES.GAME &&
    game.deviceType === DEVICE_TYPES.MOBILE &&
    game.mobileControl === MOBILE_CONTROLS.BUTTONS
  );
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