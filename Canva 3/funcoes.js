const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Configurações da bola
let square = {
  x: 200,
  y: 200,
  size: 50,
  color: "blue",
  speed: 10
}

function drawSquare() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.size, square.size);
}

function moveSquare(event) {
  const key = event.key;

  if (key === "ArrowUp" && square.y > 0) {
    square.y -= square.speed;
  } else if (key === "ArrowDown" && square.y + square.size < canvas.height) {
    square.y += square.speed;
  } else if (key === "ArrowLeft" && square.x > 0) {
    square.x -= square.speed;
  } else if (key === "ArrowRight" && square.x + square.size < canvas.width) {
    square.x += square.speed;
  } 

  drawSquare();
}

window.addEventListener('keydown', moveSquare);
drawSquare();