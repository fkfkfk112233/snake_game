import {
  game,
  GAME_STATES,
  BOARD_SIZES,
  setGameState,
  resetGameState,
} from "./state/gameState.js";

import { DEVICE_TYPES, detectDeviceType } from "./device/deviceDetector.js";

import { renderScreen } from "./ui/screenManager.js";
import { updateMobileControls } from "./ui/mobileControls.js";

import { startGame, stopGame, endGame } from "./game/gameLoop.js";

import { initializeInput } from "./input/inputManager.js";
import { unlockGameOrientation } from "./input/orientationController.js";

// ====================
// Device
// ====================

game.deviceType = detectDeviceType();

console.log(`Device Type: ${game.deviceType}`);

// 用實際裝置類型控制 Mobile UI
document.body.classList.toggle(
  "mobile-device",
  game.deviceType === DEVICE_TYPES.MOBILE,
);

initializeDeviceSettings();

// ====================
// Input
// ====================

initializeInput();

// ====================
// Navigation
// ====================

function navigateTo(state) {
  setGameState(state);

  renderScreen();
}

// ====================
// Start Game
// ====================

document.getElementById("startGameButton").addEventListener("click", () => {
  const selectedMode = document.querySelector(
    'input[name="gameMode"]:checked',
  ).value;

  game.mode = selectedMode;

  // Mobile 固定使用 20 × 20
  if (game.deviceType === DEVICE_TYPES.MOBILE) {
    game.boardSize = BOARD_SIZES.MOBILE;
  }

  updateMobileControls();

  startGame();
});

// ====================
// Settings
// ====================

document.getElementById("settingsButton").addEventListener("click", () => {
  renderSettings();

  navigateTo(GAME_STATES.SETTINGS);
});

// ====================
// Save Settings
// ====================

document.getElementById("saveSettingsButton").addEventListener("click", () => {
  // ====================
  // Game Speed
  // ====================

  const selectedSpeed = document.querySelector(
    'input[name="gameSpeed"]:checked',
  );

  if (selectedSpeed) {
    game.speed = selectedSpeed.value;
  }

  // ====================
  // Board Size
  // ====================

  if (game.deviceType === DEVICE_TYPES.DESKTOP) {
    const selectedBoardSize = document.querySelector(
      'input[name="boardSize"]:checked',
    );

    if (selectedBoardSize) {
      game.boardSize = Number(selectedBoardSize.value);
    }
  } else {
    // Mobile 固定 20 × 20
    game.boardSize = BOARD_SIZES.MOBILE;
  }

  // ====================
  // Mobile Control
  // ====================

  if (game.deviceType === DEVICE_TYPES.MOBILE) {
    const selectedMobileControl = document.querySelector(
      'input[name="mobileControl"]:checked',
    );

    if (selectedMobileControl) {
      game.mobileControl = selectedMobileControl.value;
    }
  }

  // ====================
  // Game Orientation
  // ====================

  if (game.deviceType === DEVICE_TYPES.MOBILE) {
    const selectedOrientation = document.querySelector(
      'input[name="gameOrientation"]:checked',
    );

    if (selectedOrientation) {
      game.orientation = selectedOrientation.value;
    }
  }

  // ====================
  // Return Home
  // ====================

  navigateTo(GAME_STATES.HOME);
});

// ====================
// Settings → Home
// ====================

document.getElementById("settingsBackButton").addEventListener("click", () => {
  navigateTo(GAME_STATES.HOME);
});

// ====================
// Game Over → Home
// ====================

document.getElementById("homeButton").addEventListener("click", () => {
  stopGame();
  unlockGameOrientation();

  navigateTo(GAME_STATES.HOME);
});

// ====================
// Game Over → Restart
// ====================

document.getElementById("restartButton").addEventListener("click", () => {
  startGame();
});

// ====================
// End Game
// ====================

document.getElementById("endGameButton").addEventListener("click", () => {
  endGame();
});

// ====================
// Initial Screen
// ====================

renderScreen();

// ====================
// Device Settings
// ====================

function initializeDeviceSettings() {
  const boardSizeSetting = document.getElementById("boardSizeSetting");

  if (!boardSizeSetting) {
    return;
  }

  if (game.deviceType === DEVICE_TYPES.MOBILE) {
    boardSizeSetting.style.display = "none";

    // Mobile 固定 20 × 20
    game.boardSize = BOARD_SIZES.MOBILE;
  }
}

// ====================
// Settings Renderer
// ====================

function renderSettings() {
  // ====================
  // Game Speed
  // ====================

  const speedRadio = document.querySelector(
    `input[name="gameSpeed"][value="${game.speed}"]`,
  );

  if (speedRadio) {
    speedRadio.checked = true;
  }

  // ====================
  // Board Size
  // ====================

  const boardSizeRadio = document.querySelector(
    `input[name="boardSize"][value="${game.boardSize}"]`,
  );

  if (boardSizeRadio) {
    boardSizeRadio.checked = true;
  }

  // ====================
  // Mobile Control
  // ====================

  const mobileControlRadio = document.querySelector(
    `input[name="mobileControl"][value="${game.mobileControl}"]`,
  );

  if (mobileControlRadio) {
    mobileControlRadio.checked = true;
  }

  // ====================
  // Game Orientation
  // ====================

  const orientationRadio = document.querySelector(
    `input[name="gameOrientation"][value="${game.orientation}"]`,
  );

  if (orientationRadio) {
    orientationRadio.checked = true;
  }
}
