// Selecionando o elemento canvas
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Desenhando um cículo
ctx.beginPath();
ctx.arc(150, 100, 50, 0, Math.PI * 2, false); // x, y, raio, ângulo inicial
ctx.fillStyle = 'blue'; // Cor de preenchimento
ctx.fill(); // Preenche o cínculo
ctx.strokeStyle = 'black'; // Cor da orda
ctx.stroke(); // Desenha a borda
ctx.closePath();

// Desenhando um retângulo
ctx.beginPath();
ctx.rect(50, 200, 200, 100); // x, y, largura, altura
ctx.fillStyle = 'green';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();
ctx.closePath();

// Desenhando um triângulo
ctx.beginPath();
ctx.moveTo(300, 300); // Primeiro ponto
ctx.lineTo(400, 300); // Segundo ponto
ctx.lineTo(350, 200); // Terceiro ponto
ctx.closePath(); // Fecha o triângulo
ctx.fillStyle = 'red';
ctx.fill();
ctx.strokeStyle = 'black';
ctx.stroke();