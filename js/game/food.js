import { game, FOOD_LIMITS, GAME_MODES } from "../state/gameState.js";

function getFoodLimit() {
  if (game.mode === GAME_MODES.FOOD_FRENZY) {
    return FOOD_LIMITS[game.boardSize] ?? 10;
  }

  return 1;
}

function getOccupiedCells() {
  const occupied = new Set();

  for (const segment of game.snake) {
    occupied.add(`${segment.x},${segment.y}`);
  }

  for (const food of game.foods) {
    occupied.add(`${food.x},${food.y}`);
  }

  return occupied;
}

function getAvailableCells() {
  const occupied = getOccupiedCells();
  const available = [];

  for (let y = 0; y < game.boardSize; y++) {
    for (let x = 0; x < game.boardSize; x++) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y });
      }
    }
  }

  return available;
}

export function createFood() {
  if (game.foods.length >= getFoodLimit()) {
    return false;
  }

  const availableCells = getAvailableCells();

  if (availableCells.length === 0) {
    return false;
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  game.foods.push(availableCells[randomIndex]);

  return true;
}

export function removeFoodAt(index) {
  if (index < 0 || index >= game.foods.length) {
    return false;
  }

  game.foods.splice(index, 1);
  return true;
}

export function getFoodIndexAt(position) {
  return game.foods.findIndex(
    (food) => food.x === position.x && food.y === position.y,
  );
}

export function getFoodCount() {
  return game.foods.length;
}

export function getFoodLimitForCurrentMode() {
  return getFoodLimit();
}
