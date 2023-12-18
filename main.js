// creating variables for the gameboard
let boxSize = 20;
let rows = 20;
let columns = 20;
let gameBoard;
let context;

// creating variables for the snake and velocity
let snakeX = boxSize * 5;
let snakeY = boxSize * 5;

let velocityX = 0;
let velocityY = 0;

let snakeBody = [];

// creating variables for the prize
let prizeX;
let prizeY;

// creating variables for score, supporttext and gameover
let score = document.getElementById('score');
let currentScore = 0;
let gameSupport = document.getElementById('supportText');
let gameOver = false;
let gameOverText = document.getElementById('gameOverText');

// creating a function that loads on reload and creates a gameboard
window.onload = function () {
    gameBoard = document.getElementById('gameBoard');
    gameBoard.height = rows * boxSize;
    gameBoard.width = columns * boxSize;
    //used for drawing on the gameBoard
    context = gameBoard.getContext('2d');

    // calling the prize function
    randomPrize();
    // eventlistener for changeDirection function
    document.addEventListener('keyup', changeDirection);
    // adding velocity eith setInterval 
    setInterval(update, 1000 / 8);
}

// creating an update function 
function update() {
    // adding a place for score
    score.textContent = `Score:${currentScore}`
    // if gameover stop updating
    if (gameOver) {
        return;
    }

    // creating gameboard color
    context.fillStyle = '#1f1030';
    context.fillRect(0, 0, gameBoard.width, gameBoard.height);
    // creating prize color
    context.fillStyle = '#b0679d';
    context.fillRect(prizeX, prizeY, boxSize, boxSize);

    // if snake gets prize, add prize to snake array
    if (snakeX == prizeX && snakeY == prizeY) {
        snakeBody.push([prizeX, prizeY]);
        randomPrize();
        currentScore += 1;
    }
    // shifting each element in the snakeBody array one position to the right
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    // update the snakehead position to the beginning in the array
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // create a color for the snake
    context.fillStyle = '#7cb6a8';
    snakeX += velocityX * boxSize;
    snakeY += velocityY * boxSize;
    context.fillRect(snakeX, snakeY, boxSize, boxSize);
    // iterate through each element of the snake's body and draw boxSize
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], boxSize, boxSize);
    }
    // conditional message depending on the score
    if (currentScore >= 10) {
        gameSupport.textContent = `WOW YOU'RE A PRO!`
    } else if (currentScore >= 5) {
        gameSupport.textContent = `AMAZING!`
    } else if (currentScore >= 1) {
        gameSupport.textContent = `Good job!`
    }

    // game over conditions
    // if the snake hits the wall, game over
    if (snakeX < 0 || snakeX == columns * boxSize || snakeY < 0 || snakeY == rows * boxSize) {
        gameOver = true;
        gameOverText.textContent = 'GAME OVER!';
        gameSupport.textContent = ``
    }
    // if snake hits its own body, game over
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            gameOverText.textContent = 'GAME OVER!';
            gameSupport.textContent = ``
        }
    }
}
// function for changing the direction of the snake
function changeDirection(e) {
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}
// function for randomized placement of the prize
function randomPrize() {
    prizeX = Math.floor(Math.random() * columns) * boxSize;
    prizeY = Math.floor(Math.random() * rows) * boxSize;
}
// function for starting again
function startAgain() {
    window.location.reload();
}
// eventlistener for startagain button
document.getElementById('startAgain').addEventListener('click', startAgain);