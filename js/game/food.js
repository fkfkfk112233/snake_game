import { game } from "../state/gameState.js";

export function createFood() {
  game.food.x = Math.floor(Math.random() * game.boardSize);

  game.food.y = Math.floor(Math.random() * game.boardSize);
}
