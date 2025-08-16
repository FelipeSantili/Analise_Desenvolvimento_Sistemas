const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Configurações da bola
let bola = {
  x: canvas.width / 2,
  y: canvas.width / 2,
  radius: 20,
  dx: 3,
  dy: 2,
  color: "blue",
}

function desenhar() {
  ctx.beginPath();
  ctx.arc(bola.x, bola.y, bola.radius, 0, Math.PI * 2);
  ctx.fillStyle = bola.color;
  ctx.fill();
  ctx.closePath();
}

function atualizaPosicaBola() {
  bola.x += bola.dx;
  bola.y += bola.dy;

  if (bola.x+ bola.radius > canvas.width || bola.x - bola.radius < 0) {
    bola.dx = -bola.dx; // Inverte a direção horizontal
  }
  if (bola.y+ bola.radius > canvas.width || bola.y - bola.radius < 0) {
    bola.dy = -bola.dy; // Inverte a direção vertical
  }
}

function animate() {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  desenhar();
  atualizaPosicaBola();
  requestAnimationFrame(animate);
}

animate();