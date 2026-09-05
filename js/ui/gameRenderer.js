import { game, GAME_MODES } from "../state/gameState.js";

export function renderGame() {
  const canvas = document.getElementById("gameCanvas");

  const ctx = canvas.getContext("2d");

  const cellSize = canvas.width / game.boardSize;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid(ctx, cellSize);
  drawSnake(ctx, cellSize);
  drawFood(ctx, cellSize);
  updateScore();
  updateGameStatus();
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

  for (const food of game.foods) {
    ctx.fillRect(
      food.x * cellSize,
      food.y * cellSize,
      cellSize,
      cellSize,
    );
  }
}

function updateScore() {
  document.getElementById("score").textContent = game.score;
}

function updateGameStatus() {
  const status = document.getElementById("gameStatus");

  if (!status) {
    return;
  }

  if (game.mode === GAME_MODES.TIME) {
    status.textContent = `Time: ${formatTime(game.timeRemaining)}`;
    return;
  }

  if (game.mode === GAME_MODES.FOOD_FRENZY) {
    status.textContent = `Food: ${game.foods.length}`;
    return;
  }

  status.textContent = "";
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateEndGameButton() {
  const button = document.getElementById("endGameButton");

  if (game.mode === GAME_MODES.INVINCIBLE) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
