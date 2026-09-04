import { game } from "../state/gameState.js";

function isOnSnake(position) {
  return game.snake.some(
    (segment) =>
      segment.x === position.x &&
      segment.y === position.y
  );
}

export function createFood() {
  const maxAttempts = game.boardSize * game.boardSize;

  for (let i = 0; i < maxAttempts; i++) {
    const newFood = {
      x: Math.floor(Math.random() * game.boardSize),
      y: Math.floor(Math.random() * game.boardSize),
    };

    if (!isOnSnake(newFood)) {
      game.food = newFood;
      return true;
    }
  }

  return false;
}