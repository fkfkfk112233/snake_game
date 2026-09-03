import { game, GAME_STATES, MOBILE_CONTROLS } from "../state/gameState.js";

import { DEVICE_TYPES } from "../device/deviceDetector.js";

export function initializeMobileControls() {
  const upButton = document.getElementById("upButton");

  const downButton = document.getElementById("downButton");

  const leftButton = document.getElementById("leftButton");

  const rightButton = document.getElementById("rightButton");

  if (!upButton || !downButton || !leftButton || !rightButton) {
    return;
  }

  upButton.addEventListener("click", () => {
    changeDirection("UP");
  });

  downButton.addEventListener("click", () => {
    changeDirection("DOWN");
  });

  leftButton.addEventListener("click", () => {
    changeDirection("LEFT");
  });

  rightButton.addEventListener("click", () => {
    changeDirection("RIGHT");
  });
}

function changeDirection(direction) {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  // Desktop 不允許使用 Mobile Button
  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  // 只有 Arrow Buttons 模式可以使用
  if (game.mobileControl !== MOBILE_CONTROLS.BUTTONS) {
    return;
  }

  if (direction === "UP" && game.direction !== "DOWN") {
    game.direction = "UP";
  }

  if (direction === "DOWN" && game.direction !== "UP") {
    game.direction = "DOWN";
  }

  if (direction === "LEFT" && game.direction !== "RIGHT") {
    game.direction = "LEFT";
  }

  if (direction === "RIGHT" && game.direction !== "LEFT") {
    game.direction = "RIGHT";
  }
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

  // Mobile + Arrow Buttons
  if (game.mobileControl === MOBILE_CONTROLS.BUTTONS) {
    mobileControls.style.display = "flex";

    return;
  }

  // Mobile + Swipe
  mobileControls.style.display = "none";
}
