import { initializeKeyboardInput } from "./keyboardInput.js";
import { initializeMobileControls } from "../ui/mobileControls.js";

export function initializeInput() {
  initializeKeyboardInput();
  initializeMobileControls();
}
