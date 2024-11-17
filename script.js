let highestScoreDiv = document.querySelector(".highestScore");
let highestScore = 0;

const gameBoard = document.querySelector(".gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector(".scoreText");
const resetBtn = document.querySelector(".resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;

// colors
const boardBackground = "white";
const snakeColor = "lightGreen";
const snakeBorder = "black";
const foodColor = "red";

const unitSize = 25; //px we are moving

// some var
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;

let foodX; let foodY; // food coordinates

let score = 0;


let snake = [
    { x:unitSize * 4, y:0 }, 
    { x:unitSize * 3, y:0 }, 
    { x:unitSize * 2, y:0 }, 
    { x:unitSize, y:0 }, 
    { x:0, y:0 }, 
]

// event -> changing direction
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

startGame(); // function to start the game

// making function that we need
function startGame() {
    running = true; // started the game
    scoreText.textContent = score; //updating the score
    createFood();
    drawFood();
    nextTick(); // changing clock
}

function nextTick() {
    if(running) {
        setTimeout( () => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },  100);
    }
    else {
        displayGameOver(); //if game is not running then the game is over
        // so display game over
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground; // setting the color to fill in context
    ctx.fillRect(0, 0, gameWidth, gameHeight);
    // setting white color from 0, 0 -> to full width means all board will be white again
}

function createFood() {
    function randomFood(min, max) {
        let randNum = Math.round( (( Math.random() * (max - min) + min) / unitSize)) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
}

function drawFood() {
    ctx.fillStyle = foodColor; // setting color
    ctx.fillRect(foodX, foodY, unitSize, unitSize); // filling the rect at food X & Y coordinates and rect is unitSize x unitSize
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity,
                   y: snake[0].y + yVelocity
                 }
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY) {
        score++;
        scoreText.textContent = score;
        createFood();
    }else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder; // simply means border

    snake.forEach((snakePart) => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const keyPressed = event.keyCode; // this will give us the code of the key that we pressed
    
    // KEY CODE FOR ARROW KEYS
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    // determining the direction
    const goingLeft = (xVelocity == -unitSize);
    const goingUp = (yVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingDown = (yVelocity == unitSize);

    // switch case
    switch(true) { // checking for true

        // checking if the keyPressed is for left and we are not going right currently
        // because from the game rule we can't move in opposite direction from where are we going
        case (keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
}

function checkGameOver() {
    switch(true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for(let i = 1; i< snake.length; i++) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
            break;
        }
    }
}

function displayGameOver() {
    clearBoard();
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
    running = false;
}

function resetGame() {
    if(score > highestScore) {
        highestScore = score;
    }
    highestScoreDiv.textContent = highestScore;
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x:unitSize * 4, y:0 }, 
        { x:unitSize * 3, y:0 }, 
        { x:unitSize * 2, y:0 }, 
        { x:unitSize, y:0 }, 
        { x:0, y:0 }
    ];
    startGame();
}

