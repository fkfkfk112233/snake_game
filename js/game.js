const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boardSize = 600;
const cellSize = 20;

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < boardSize; x += cellSize) {
    for (let y = 0; y < boardSize; y += cellSize) {
      ctx.strokeStyle = "#333";

      ctx.strokeRect(x, y, cellSize, cellSize);
    }
  }
}

drawBoard();
