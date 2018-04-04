var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var player = {};
player.paddleHeight = 10;
player.paddleWidth = 75;
player.paddleX = (canvas.width-player.paddleWidth)/2;
player.score = 0;
player.health = 5;
var rightPressed = false;
var leftPressed = false;
var score = 0;
var lives = 3;
var level = 0;
var gravity = 2;
var ballDone = true;

var x = 0;
var y = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        player.paddleX = relativeX - player.paddleWidth/2;
    }
}

function drawBall(posX, posY) {
    ctx.beginPath();
    ctx.arc(posX, posY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(player.paddleX, canvas.height-player.paddleHeight, player.paddleWidth, player.paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+player.score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+player.health, canvas.width-65, 20);
}
function movePaddle(){
    if(rightPressed && player.paddleX < canvas.width-player.paddleWidth) {
        player.paddleX += 7;
    }
    else if(leftPressed && player.paddleX > 0) {
        player.paddleX -= 7;
    }
}
function balls(){
    if(ballDone){
        x = Math.floor(Math.random()*800);
        ballDone = false;
    }

    
    drawBall(x, y);
}
function groundCheck(){
    if(y >= canvas.height){
       if(x >= player.paddleX && x <= player.paddleX + player.paddleWidth){
            player.health -= 1;
            resetBall();
        }else if(x < player.paddleX || x > player.paddleX + player.paddleWidth){
            player.score += 1;
            resetBall();
        }
    }
}

function resetBall() {
    x = 0;
    y = 0;
    ballDone = true;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawScore();
    drawLives();
    movePaddle();
    balls();
    groundCheck();
    
    y += gravity;
    requestAnimationFrame(draw);
}

draw();