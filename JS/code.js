var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var player = {};
player.paddleHeight = 10;
player.paddleWidth = 45;
player.paddleX = (canvas.width-player.paddleWidth)/2;
player.score = 0;
player.health = 5;
var rightPressed = false;
var leftPressed = false;
var level = 0;
var balls = [{
        x: Math.floor(Math.random()*800),
        y: Math.floor(Math.random()*200)*-1,
        ballDone: false
    }];

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

function drawBall() {
    for(let i = 0;i<balls.length;i++){
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
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
function ballsCheck(){
    for(let i = 0;i<balls.length;i++){
        if(balls[i].ballDone){
            balls[i].x = Math.floor(Math.random()*800);
            balls[i].y = Math.floor(Math.random()*1000)*-1;
            balls[i].ballDone = false;
        }
    }
    drawBall();
}
function checkBalls(){
    if(player.score % 2 == 0){
        addBall();
    }
}
function groundCheck(){
    for(let i=0;i<balls.length;i++){
        if(balls[i].y >= canvas.height){
           if(balls[i].x >= player.paddleX && balls[i].x <= player.paddleX + player.paddleWidth){
                player.health -= 1;
                resetBall(balls[i]);
            }else if(balls[i].x < player.paddleX || balls[i].x > player.paddleX + player.paddleWidth){
                player.score += 1;
                checkBalls();
                resetBall(balls[i]);
            }
        }
    }
}
function gravity(){
    for(let i=0;i<balls.length;i++){
        balls[i].y += 5;
    }
}
function addBall(){
    if (balls.length < 65){
        balls.push({
            x: Math.floor(Math.random()*800),
            y: Math.floor(Math.random()*200)*-1,
            ballDone: false
        })
    }
}
function resetBall(ball) {
        ball.x = Math.floor(Math.random()*800);
        ball.y = Math.floor(Math.random()*200)*-1;
        ball.ballDone = true;
}
function endGame() {
    if(player.health <= 0){
        document.location.reload();
        alert("Player is out of lives with " + player.score + " points!");
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawPaddle();
    drawScore();
    drawLives();
    movePaddle();
    ballsCheck();
    groundCheck();
    gravity();
    requestAnimationFrame(draw);
    endGame();
}

draw();