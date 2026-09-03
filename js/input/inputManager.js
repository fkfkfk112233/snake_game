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
