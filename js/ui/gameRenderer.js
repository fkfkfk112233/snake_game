import { game } from "../state/gameState.js";

export function renderGame() {
  const canvas = document.getElementById("gameCanvas");

  const ctx = canvas.getContext("2d");

  const cellSize = canvas.width / game.boardSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(ctx, cellSize);
  drawSnake(ctx, cellSize);
  drawFood(ctx, cellSize);
  updateScore();
  updateEndGameButton();
}

function drawGrid(ctx, cellSize) {
  ctx.strokeStyle = "#333";

  for (let x = 0; x < game.boardSize; x++) {
    for (let y = 0; y < game.boardSize; y++) {
      ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawSnake(ctx, cellSize) {
  ctx.fillStyle = "lime";

  for (const part of game.snake) {
    ctx.fillRect(part.x * cellSize, part.y * cellSize, cellSize, cellSize);
  }
}

function drawFood(ctx, cellSize) {
  ctx.fillStyle = "red";

  ctx.fillRect(
    game.food.x * cellSize,
    game.food.y * cellSize,
    cellSize,
    cellSize,
  );
}

function updateScore() {
  document.getElementById("score").textContent = game.score;
}

function updateEndGameButton() {
  const button = document.getElementById("endGameButton");

  if (game.mode === "INVINCIBLE") {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
