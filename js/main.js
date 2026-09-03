import { game, GAME_STATES, setGameState } from "./state/gameState.js";

import { renderScreen } from "./ui/screenManager.js";

import { startGame, stopGame } from "./game/gameLoop.js";

import { initializeInput } from "./game/input.js";

initializeInput();

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

  startGame();
});

// ====================
// Settings
// ====================

document.getElementById("settingsButton").addEventListener("click", () => {
  navigateTo(GAME_STATES.SETTINGS);
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
  navigateTo(GAME_STATES.HOME);
});

// ====================
// Game Over → Restart
// ====================

document.getElementById("restartButton").addEventListener("click", () => {
  startGame();
});

// ====================
// Initial Screen
// ====================

renderScreen();

// ====================
// Initial Screen
// ====================

renderScreen();

// ====================
// End Game Button
// ====================

document
    .getElementById("endGameButton")
    .addEventListener("click", () => {

        stopGame();

        game.gameOver = true;

        document.getElementById(
            "finalScore"
        ).textContent = game.score;

        setGameState(
            GAME_STATES.GAME_OVER
        );

        renderScreen();
    });
