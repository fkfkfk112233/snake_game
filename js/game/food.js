import { game } from "../state/gameState.js";

export function createFood() {
  let newFood;

  do {
    newFood = {
      x: Math.floor(Math.random() * game.boardSize),

      y: Math.floor(Math.random() * game.boardSize),
    };
  } while (isOnSnake(newFood));

  game.food = newFood;
}

function isOnSnake(position) {
  return game.snake.some(
    (part) => part.x === position.x && part.y === position.y,
  );
}
