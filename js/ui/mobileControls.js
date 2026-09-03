import { game, GAME_STATES } from "../state/gameState.js";

export function initializeMobileControls() {
  const upButton = document.getElementById("upButton");
  const downButton = document.getElementById("downButton");
  const leftButton = document.getElementById("leftButton");
  const rightButton = document.getElementById("rightButton");

  if (!upButton || !downButton || !leftButton || !rightButton) {
    return;
  }

  upButton.addEventListener("click", () => {
    changeDirection("UP");
  });

  downButton.addEventListener("click", () => {
    changeDirection("DOWN");
  });

  leftButton.addEventListener("click", () => {
    changeDirection("LEFT");
  });

  rightButton.addEventListener("click", () => {
    changeDirection("RIGHT");
  });
}

function changeDirection(direction) {
  if (game.screen !== GAME_STATES.GAME) {
    return;
  }

  if (direction === "UP" && game.direction !== "DOWN") {
    game.direction = "UP";
  }

  if (direction === "DOWN" && game.direction !== "UP") {
    game.direction = "DOWN";
  }

  if (direction === "LEFT" && game.direction !== "RIGHT") {
    game.direction = "LEFT";
  }

  if (direction === "RIGHT" && game.direction !== "LEFT") {
    game.direction = "RIGHT";
  }
}
