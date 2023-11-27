const ball = document.getElementsByClassName("ball")[0];
const surface = document.getElementsByClassName("surface")[0];
let gravity = 0.5;
let ballProps = ball.getBoundingClientRect();
let surfaceProps = surface.getBoundingClientRect();
let moveSpeed = 3;

let ball_dy = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addGravity();
    addObstacle();
    moveObstacle();
  }
});

function moveObstacle() {
  let obstacles = Array.from(document.getElementsByClassName("obstacle"));
  obstacles.forEach((obstacle) => {
    let obstacleProps = obstacle.getBoundingClientRect();
    if (obstacleProps.right <= 0) {
      obstacle.remove();
    }
    obstacle.style.left = obstacleProps.left - moveSpeed + "px";
  });
  requestAnimationFrame(moveObstacle);
}
function addGravity() {
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

  requestAnimationFrame(addGravity);
}
let separation = 0;
function addObstacle() {
  if (separation > 115) {
    let obstacleposi = Math.floor(Math.random() * 12) + 2;
    console.log(obstacleposi);
    separation = 0;
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    obstacle.style.top = 65 - obstacleposi + "vh";
    document.body.appendChild(obstacle);
  }
  separation++;
  requestAnimationFrame(addObstacle);
}
