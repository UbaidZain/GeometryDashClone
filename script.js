const ball = document.getElementsByClassName("ball")[0];
const surface = document.getElementsByClassName("surface")[0];
let gravity = 0.5;
let gameState = "start";
let ballProps = ball.getBoundingClientRect();
let surfaceProps = surface.getBoundingClientRect();
let moveSpeed = 3;
let message = document.getElementsByClassName("message")[0];
let scoreTitle = document.getElementsByClassName("score-title")[0];
let scoreValue = document.getElementsByClassName("score-value")[0];
let highScoreValue = document.getElementsByClassName("high-score-value")[0];
console.log(highScoreValue);
let moveSpeedIcrease = 0;
let ball_dy = 0;
let is_running = false;

highScoreValue.innerHTML = JSON.parse(localStorage.getItem("ballHighScore"));
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (gameState !== "play") {
      let obstacles = Array.from(document.getElementsByClassName("obstacle"));
      obstacles.forEach((obstacle) => {
        obstacle.remove();
      });
      gameState = "play";
      message.innerHTML = "";
      ball.style.top = "20vh";
      is_running = true;
      scoreValue.innerHTML = 0;

      addGravity();
      addObstacle();
      play();
    }
  }
});

function play() {
  let obstacles = Array.from(document.getElementsByClassName("obstacle"));
  if (gameState === "play") {
    obstacles.forEach((obstacle) => {
      let obstacleProps = obstacle.getBoundingClientRect();
      if (obstacleProps.right <= 0) {
        obstacle.remove();
      }
      if (
        ballProps.left < obstacleProps.left + obstacleProps.width &&
        ballProps.left + ballProps.width > obstacleProps.left &&
        ballProps.top < obstacleProps.top + obstacleProps.height &&
        ballProps.top + ballProps.height > obstacleProps.top
      ) {
        endGame();
      }
      if (
        ballProps.left < obstacleProps.left + obstacleProps.width &&
        ballProps.left + ballProps.width > obstacleProps.left &&
        obstacle.increase_value === 1
      ) {
        obstacle.increase_value = 0;
        scoreValue.innerHTML = parseInt(scoreValue.innerHTML) + 1;
        moveSpeedIcrease++;
      }
      obstacle.style.left = obstacleProps.left - moveSpeed + "px";
    });
    if (moveSpeedIcrease > 5) {
      moveSpeedIcrease = 0;
      moveSpeed += 0.2;
    }
  }
  if (is_running === true) {
    requestAnimationFrame(play);
  }
}
function addGravity() {
  if (gameState === "play") {
    document.addEventListener("keydown", (e) => {
      if (e.key === " " || e.key === "ArrowUp") {
        ball_dy = -12;
        ball.style.top = ballProps.top + ball_dy + "px";
      }
    });
    if (ballProps.bottom < surfaceProps.top) {
      ball_dy += gravity;

      ball.style.top = ballProps.top + ball_dy + "px";
    }
    ballProps = ball.getBoundingClientRect();
  }
  if (is_running === true) {
    requestAnimationFrame(addGravity);
  }
}
let minusSeparation = moveSpeed / 3;
let separation = 0;
function addObstacle() {
  if (separation > 115 / minusSeparation) {
    let obstacleposi = Math.floor(Math.random() * 10) + 2;
    separation = 0;
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.top = 65 - obstacleposi + "vh";
    obstacle.increase_value = 1;
    document.body.appendChild(obstacle);
  }
  separation++;

  if (is_running == true) {
    requestAnimationFrame(addObstacle);
  }
}
function endGame() {
  highScoreSave();
  message.innerHTML = "Press enter to restart";
  moveSpeed = 3;
  gameState = "end";
  is_running = false;
}
function highScoreSave() {
  let score = parseInt(scoreValue.innerHTML);
  console.log(score);
  let highScore;
  if (localStorage.getItem("ballHighScore") === null) {
    highScore = [0];
  } else {
    highScore = JSON.parse(localStorage.getItem("ballHighScore"));
  }
  if (highScore[0] < score) {
    highScore[0] = score;
  }
  localStorage.setItem("ballHighScore", JSON.stringify(highScore));
}
