import {
  game,
  GAME_STATES,
  BOARD_SIZES,
  setGameState,
  resetGameState,
} from "./state/gameState.js";

import { DEVICE_TYPES, detectDeviceType } from "./device/deviceDetector.js";

import { renderScreen } from "./ui/screenManager.js";

import { startGame, stopGame, endGame } from "./game/gameLoop.js";

import { initializeInput } from "./input/inputManager.js";

// ====================
// Device
// ====================

game.deviceType = detectDeviceType();
console.log(`Device Type: ${game.deviceType}`);

initializeDeviceSettings();

// ====================
// Input
// ====================

initializeInput();

// ====================
// Navigation
// ====================

function navigateTo(state) {
  stopGame();

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

  // ====================
  // Board Size
  // ====================

  if (game.deviceType === DEVICE_TYPES.MOBILE) {
    // Mobile 固定 20 × 20
    game.boardSize = BOARD_SIZES.MOBILE;
  } else {
    // Desktop 使用玩家選擇
    const selectedBoardSize = document.querySelector(
      'input[name="boardSize"]:checked',
    ).value;

    game.boardSize = Number(selectedBoardSize);
  }

  const selectedMobileControl = document.querySelector(
    'input[name="mobileControl"]:checked',
  );

  if (selectedMobileControl) {
    game.mobileControl = selectedMobileControl.value;
  }

  startGame();
});

// ====================
// Settings
// ====================

document.getElementById("settingsButton").addEventListener("click", () => {
  renderSettings();

  navigateTo(GAME_STATES.SETTINGS);
});

document.getElementById("saveSettingsButton").addEventListener("click", () => {
  const selectedSpeed = document.querySelector(
    'input[name="gameSpeed"]:checked',
  ).value;

  game.speed = selectedSpeed;

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
  resetGameState();

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

    game.boardSize = BOARD_SIZES.MOBILE;
  }
}

// ====================
// Settings Renderer
// ====================

function renderSettings() {
  const speedRadio = document.querySelector(
    `input[name="gameSpeed"][value="${game.speed}"]`,
  );

  if (speedRadio) {
    speedRadio.checked = true;
  }
}
