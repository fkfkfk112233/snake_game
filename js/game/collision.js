import { game } from "../state/gameState.js";

export function isWallCollision(head) {
  return (
    head.x < 0 ||
    head.x >= game.boardSize ||
    head.y < 0 ||
    head.y >= game.boardSize
  );
}

export function isFoodCollision(head) {
  return head.x === game.food.x && head.y === game.food.y;
}

export function isSelfCollision(head) {
  for (let i = 1; i < game.snake.length; i++) {
    const body = game.snake[i];

    if (head.x === body.x && head.y === body.y) {
      return true;
    }
  }

  return false;
}
