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
// Food
// ====================

const food = {
    x: 0,
    y: 0
};


// ====================
// Create Food
// ====================

function createFood() {

    food.x = Math.floor(
        Math.random() * (boardSize / cellSize)
    );

    food.y = Math.floor(
        Math.random() * (boardSize / cellSize)
    );
}


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
// Draw Food
// ====================

function drawFood() {

    ctx.fillStyle = "red";

    ctx.fillRect(
        food.x * cellSize,
        food.y * cellSize,
        cellSize,
        cellSize
    );
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


    // 判斷有沒有吃到食物

    const ateFood =
        newHead.x === food.x &&
        newHead.y === food.y;


    // 加入新的蛇頭

    snake.unshift(newHead);


    // 如果沒有吃到食物才刪除尾巴

    if (!ateFood) {
        snake.pop();
    }


    // 如果吃到食物

    if (ateFood) {
        createFood();
    }
}


// ====================
// Keyboard
// ====================

function handleKeyDown(event) {

    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }

    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }

    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }

    if (event.key === "ArrowRight" && direction !== "LEFT") {
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
    drawFood();
}


// ====================
// Game Loop
// ====================

function gameLoop() {

    moveSnake();

    drawGame();
}


// ====================
// Start Game
// ====================

createFood();

setInterval(gameLoop, 150);