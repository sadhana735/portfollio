// variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameover = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 5;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 15, y: 7 };

// function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}
//when snake collide 
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snake[0].x && snakeArr[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }


}
// game start and end action
function gameEngine() {
    if (isCollide(snakeArr)) {
        gameover.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over press any key to play again!");
        snakeArr = [{ x: 5, y: 15 }];
        musicSound.play();
        score = 0;
    }
    // if food have been eaten
    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodsound.play();
        score += 1;
        if (score > HighScoreval) {
            HighScoreval = score;
            localStorage.setItem("HighScore", JSON.stringify(HighScoreval));
            HighScoreBox.innerHTML = "HighScore: " + HighScoreval;
        }
        scoreBox.innerHTML = 'Score:  ' + score;
        // running snake
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        // genratate new postion snake food
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    // move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // create head and snake with his position
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {

            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// logic
let HighScore = localStorage.getItem("HighScore");
if (HighScore == null) {
    HighScoreval = 0;
    localStorage.setItem("HighScore", JSON.stringify(HighScoreval));
}
else {
    HighScoreval = JSON.parse(HighScore);
    HighScoreBox.innerHTML = "HighScore:  " + HighScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //start the game
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});