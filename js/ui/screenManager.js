import { getGameState } from "../state/gameState.js";

const screens = {
  HOME: document.getElementById("homeScreen"),
  GAME: document.getElementById("gameScreen"),
  SETTINGS: document.getElementById("settingsScreen"),
  GAME_OVER: document.getElementById("gameOverScreen"),
  WIN: document.getElementById("winScreen"),
};

export function renderScreen() {
  const currentState = getGameState();

  Object.values(screens).forEach((screen) => {
    if (screen) {
      screen.classList.remove("active");
    }
  });

  const currentScreen = screens[currentState];

  if (currentScreen) {
    currentScreen.classList.add("active");
  }
}
