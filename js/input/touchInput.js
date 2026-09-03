import { game, GAME_STATES, MOBILE_CONTROLS } from "../state/gameState.js";

import { DEVICE_TYPES } from "../device/deviceDetector.js";

let startX = 0;
let startY = 0;

const SWIPE_THRESHOLD = 30;

export function initializeTouchInput() {
  const gameScreen = document.getElementById("gameScreen");

  if (!gameScreen) {
    return;
  }

  gameScreen.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });

  gameScreen.addEventListener("touchend", handleTouchEnd, {
    passive: true,
  });
}

function handleTouchStart(event) {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  if (game.mobileControl !== MOBILE_CONTROLS.SWIPE) {
    return;
  }

  const touch = event.changedTouches[0];

  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchEnd(event) {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  if (game.deviceType !== DEVICE_TYPES.MOBILE) {
    return;
  }

  if (game.mobileControl !== MOBILE_CONTROLS.SWIPE) {
    return;
  }

  const touch = event.changedTouches[0];

  const endX = touch.clientX;
  const endY = touch.clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  if (Math.max(absX, absY) < SWIPE_THRESHOLD) {
    return;
  }

  if (absX > absY) {
    if (deltaX > 0) {
      changeDirection("RIGHT");
    } else {
      changeDirection("LEFT");
    }
  } else {
    if (deltaY > 0) {
      changeDirection("DOWN");
    } else {
      changeDirection("UP");
    }
  }
}

function changeDirection(direction) {
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
