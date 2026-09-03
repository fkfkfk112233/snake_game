import { GAME_STATES, getGameState } from "../state/gameState.js";

const screens = {
  HOME: document.getElementById("homeScreen"),

  GAME: document.getElementById("gameScreen"),

  SETTINGS: document.getElementById("settingsScreen"),

  GAME_OVER: document.getElementById("gameOverScreen"),
};

export function renderScreen() {
  const currentState = getGameState();

  // 先把所有畫面隱藏

  Object.values(screens).forEach((screen) => {
    screen.classList.remove("active");
  });

  // 顯示目前 State 對應的畫面

  const currentScreen = screens[currentState];

  if (currentScreen) {
    currentScreen.classList.add("active");
  }
}
