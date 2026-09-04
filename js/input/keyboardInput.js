import { changeDirection } from "./directionController.js";

export function initializeKeyboardInput() {
  document.addEventListener("keydown", handleKeyDown);
}

function handleKeyDown(event) {
  // Snake 使用方向鍵時，阻止瀏覽器預設行為，
  // 避免遊戲操作時網頁跟著上下捲動。
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {
    event.preventDefault();
  }

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