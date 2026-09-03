const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boardSize = 600;
const cellSize = 20;


// ====================
// Snake
// ====================

const snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];

let direction = "RIGHT";


// ====================
// Draw Board
// ====================

function drawBoard() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let x = 0; x < boardSize; x += cellSize) {

        for (let y = 0; y < boardSize; y += cellSize) {

            ctx.strokeStyle = "#333";

            ctx.strokeRect(
                x,
                y,
                cellSize,
                cellSize
            );
        }
    }
}


// ====================
// Draw Snake
// ====================

function drawSnake() {

    for (let i = 0; i < snake.length; i++) {

        const part = snake[i];

        ctx.fillStyle = "lime";

        ctx.fillRect(
            part.x * cellSize,
            part.y * cellSize,
            cellSize,
            cellSize
        );
    }
}


// ====================
// Move Snake
// ====================

function moveSnake() {

    const head = snake[0];

    let newHead = {
        x: head.x,
        y: head.y
    };

    if (direction === "UP") {
        newHead.y -= 1;
    }

    if (direction === "DOWN") {
        newHead.y += 1;
    }

    if (direction === "LEFT") {
        newHead.x -= 1;
    }

    if (direction === "RIGHT") {
        newHead.x += 1;
    }

    snake.unshift(newHead);

    snake.pop();
}


// ====================
// Keyboard
// ====================

function handleKeyDown(event) {

    if (event.key === "ArrowUp") {
        direction = "UP";
    }

    if (event.key === "ArrowDown") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight") {
        direction = "RIGHT";
    }
}

document.addEventListener("keydown", handleKeyDown);


// ====================
// Draw Game
// ====================

function drawGame() {

    drawBoard();
    drawSnake();
}


// ====================
// Game Loop
// ====================

function gameLoop() {

    moveSnake();

    drawGame();
}

setInterval(gameLoop, 150);