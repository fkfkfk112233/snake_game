import {
  game,
  GAME_STATES,
  MOBILE_CONTROLS,
} from "../state/gameState.js";

import { DEVICE_TYPES } from "../device/deviceDetector.js";

import { changeDirection } from "./directionController.js";

let startX = 0;
let startY = 0;

const MIN_SWIPE_THRESHOLD = 20;
const MAX_SWIPE_THRESHOLD = 50;
const SWIPE_RATIO = 0.08;

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

  const swipeThreshold = getSwipeThreshold();

  if (Math.max(absX, absY) < swipeThreshold) {
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

function getSwipeThreshold() {
  const screenSize = Math.min(
    window.innerWidth,
    window.innerHeight,
  );

  return Math.max(
    MIN_SWIPE_THRESHOLD,
    Math.min(screenSize * SWIPE_RATIO, MAX_SWIPE_THRESHOLD),
  );
}