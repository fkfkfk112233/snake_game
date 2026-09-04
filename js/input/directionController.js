import { game } from "../state/gameState.js";

export function changeDirection(direction) {
    if (direction === "UP" && game.direction === "DOWN") {
        return;
    }

    if (direction === "DOWN" && game.direction === "UP") {
        return;
    }

    if (direction === "LEFT" && game.direction === "RIGHT") {
        return;
    }

    if (direction === "RIGHT" && game.direction === "LEFT") {
        return;
    }

    game.direction = direction;
}