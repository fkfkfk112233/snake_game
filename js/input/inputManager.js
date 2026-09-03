import { game, MOBILE_CONTROLS } from "../state/gameState.js";

import { initializeKeyboardInput } from "./keyboardInput.js";
import { initializeTouchInput } from "./touchInput.js";
import {
  initializeMobileControls,
  updateMobileControls,
} from "../ui/mobileControls.js";

export function initializeInput() {
  initializeKeyboardInput();
  initializeMobileControls();
  initializeTouchInput();

  updateMobileControls();
}

export function isMobileButtonControl() {
  return game.mobileControl === MOBILE_CONTROLS.BUTTONS;
}

export function isSwipeControl() {
  return game.mobileControl === MOBILE_CONTROLS.SWIPE;
}
