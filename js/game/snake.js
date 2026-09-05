import { game } from "../state/gameState.js";

export function initializeSnake() {
  // 以棋盤中心作為 Snake 初始位置，避免依賴固定座標
  const center = Math.floor(game.boardSize / 2);

  game.snake = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
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
