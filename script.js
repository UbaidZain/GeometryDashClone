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

let ball_dy = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    gameState = "play";
    message.innerHTML = "";
    scoreValue.innerHTML = 0;

    addGravity();
    addObstacle();
    play();
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
        gameState = "start";
      }
      if (
        ballProps.left < obstacleProps.left + obstacleProps.width &&
        ballProps.left + ballProps.width > obstacleProps.left &&
        obstacle.increase_value === 1
      ) {
        obstacle.increase_value = 0;
        scoreValue.innerHTML = parseInt(scoreValue.innerHTML) + 1;
      }
      obstacle.style.left = obstacleProps.left - moveSpeed + "px";
    });
  }
  requestAnimationFrame(play);
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
  requestAnimationFrame(addGravity);
}
let separation = 0;
function addObstacle() {
  if (gameState === "play") {
    if (separation > 115) {
      let obstacleposi = Math.floor(Math.random() * 12) + 2;
      console.log(obstacleposi);
      separation = 0;
      let obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      obstacle.style.top = 65 - obstacleposi + "vh";
      obstacle.increase_value = 1;
      document.body.appendChild(obstacle);
    }
    separation++;
  }

  requestAnimationFrame(addObstacle);
}
