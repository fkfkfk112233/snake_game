import { game } from "../state/gameState.js";

export function initializeInput() {
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
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
