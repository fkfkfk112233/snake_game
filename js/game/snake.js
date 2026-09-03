import { game } from "../state/gameState.js";

export function initializeSnake() {
  game.snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];
}

export function moveSnake() {
  const head = game.snake[0];

  const newHead = {
    x: head.x,
    y: head.y,
  };

  if (game.direction === "UP") {
    newHead.y--;
  }

  if (game.direction === "DOWN") {
    newHead.y++;
  }

  if (game.direction === "LEFT") {
    newHead.x--;
  }

  if (game.direction === "RIGHT") {
    newHead.x++;
  }

  return newHead;
}

export function applySnakeMove(newHead) {
  game.snake.unshift(newHead);
}
