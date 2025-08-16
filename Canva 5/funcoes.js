const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circle = {
  x: 50,
  y: 50,
  speed: 5,
  radius: 20,
  color: 'red',
}

let square = {
  x: 150,
  y: 150,
  width:100,
  height: 100,
  color: 'blue',
}

function drawCircle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2); // x, y, raio, ângulo inicial
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}

const collisionInfo = docoment.getElementById('collisionInfo');

function drawCircle() {
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2); // x, y, raio, ângulo inicial
  ctx.fillStyle = circle.color;
  ctx.fill();
  ctx.closePath();
}

function drawSquare() {
  ctx.fill
}

function checkCollision() {
  const distX = Math.abs(circle.x - (square.x + width / 2))
  const distY = Math.abs(circle.x y (square.x + width / 2))

  if(distX <= square.width) / 2 + circle

}

