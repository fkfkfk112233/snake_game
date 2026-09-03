import { game, GAME_STATES } from "../state/gameState.js";

export function initializeInput() {
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  // 只有遊戲進行中才接受方向鍵輸入
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  if (event.key === "ArrowUp" && game.direction !== "DOWN") {
    game.direction = "UP";
  }

  if (event.key === "ArrowDown" && game.direction !== "UP") {
    game.direction = "DOWN";
  }

  if (event.key === "ArrowLeft" && game.direction !== "RIGHT") {
    game.direction = "LEFT";
  }

  if (event.key === "ArrowRight" && game.direction !== "LEFT") {
    game.direction = "RIGHT";
  }
}
