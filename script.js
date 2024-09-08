// script.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // size of one block
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = 'RIGHT';
let apple = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let score = 0;

// Draw the snake
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? '#3498db' : '#2980b9';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#ecf0f1';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
}

// Draw the apple
function drawApple() {
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(apple.x, apple.y, box, box);
}

// Move the snake
function moveSnake() {
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // If snake eats the apple
    if (snakeX === apple.x && snakeY === apple.y) {
        score++;
        apple = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Game over conditions
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);
}

// Check for collision
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Control the snake
document.addEventListener('keydown', directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Draw the game
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawApple();
    moveSnake();
}

let game = setInterval(drawGame, 150);
