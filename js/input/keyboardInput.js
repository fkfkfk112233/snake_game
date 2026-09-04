import { changeDirection } from "./directionController.js";

export function initKeyboardInput() {
    document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
        changeDirection("UP");
    }

    if (event.key === "ArrowDown") {
        changeDirection("DOWN");
    }

    if (event.key === "ArrowLeft") {
        changeDirection("LEFT");
    }

    if (event.key === "ArrowRight") {
        changeDirection("RIGHT");
    }
}