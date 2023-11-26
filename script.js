const ball = document.getElementsByClassName("ball")[0];
const surface = document.getElementsByClassName("surface")[0];
let gravity = 1;
let ballProps = ball.getBoundingClientRect();
let surfaceProps = surface.getBoundingClientRect();

let ball_dy = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addGravity();
  }
});
function addGravity() {
  if (ballProps.bottom < surfaceProps.top) {
    ball_dy += gravity;
    console.log(ball_dy);
    ball.style.top = ballProps.top + ball_dy + "px";
  }
  ballProps = ball.getBoundingClientRect();

  requestAnimationFrame(addGravity);
}
