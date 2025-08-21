var vetMovimento=[];
var posRobo, posCasa;
var casa, robo;
var buracos = new Set();
var pos=0;
var vizinhanca = [];

const DIMENSAO = 8;
const QTD_BURACOS = 8;

function addRipple(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const span = document.createElement('span');
  span.className='ripple';
  span.style.setProperty('--x', (e.clientX-rect.left)+'px');
  span.style.setProperty('--y', (e.clientY-rect.top)+'px');
  btn.appendChild(span);
  setTimeout(()=> span.remove(), 550);
}
window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.btn').forEach(b=> b.addEventListener('click', addRipple));
});

function registrarPassos(e){
  let mov = Number(e.id);
  vetMovimento.push(mov);

  let tbody = document.querySelector("#tabelaPassos tbody");
  let row = document.createElement("tr");
  const nomes = {0:"Direita",1:"Esquerda",2:"Acima",3:"Abaixo"};
  row.innerHTML = `<td>${vetMovimento.length}</td><td>${nomes[mov]}</td>`;
  tbody.appendChild(row);
}

function moverRobo(){
  document.getElementById(posRobo).innerHTML="";
  let [l,c] = posRobo.split(",").map(Number);
  el = vetMovimento[pos++];

  switch(el){
    case 0:
      if(c < DIMENSAO-1) c++;
      break;
    case 1:
      if(c > 0) c--;
      break;
    case 2:
      if(l > 0) l--;
      break;
    case 3:
      if(l < DIMENSAO-1) l++;
      break;
  }

  posRobo = l+","+c;

  if(buracos.has(posRobo)){
    gameOver("O robô caiu em um buraco e foi destruído 💥");
    return;
  }

  document.getElementById(posRobo).appendChild(robo);
}

function posicionaImagens(){
  robo=document.createElement("img");
  robo.onclick = iniciar;
  robo.className="imagens";
  robo.src="img/robo.png";

  casa=document.createElement("img");
  casa.className="imagens";
  casa.src="img/casa.png";

  let l= Math.floor(Math.random() * 4);
  let c=Math.floor(Math.random() * 8);
  posRobo = l+","+c;
  document.getElementById(posRobo).appendChild(robo);

  l= Math.floor(Math.random() * 4)+4;
  c=Math.floor(Math.random() * 8);
  posCasa = l+","+c;
  document.getElementById(posCasa).appendChild(casa);

  insereBuracos();
}

function insereBuracos(){
  let cont=0;
  while(cont<QTD_BURACOS){
    let l = Math.floor(Math.random() * DIMENSAO);
    let c = Math.floor(Math.random() * DIMENSAO);
    let id = l+","+c;
    if(id!==posRobo && id!==posCasa && !buracos.has(id)){
      buracos.add(id);
      let b=document.createElement("img");
      b.className="imagens";
      b.src="img/buraco.png";
      document.getElementById(id).appendChild(b);
      cont++;
    }
  }
}

function criaTabela(){
  const tabela = document.createElement('table');
  for (let i = 0; i < DIMENSAO; i++) {
    const linha = document.createElement('tr');
    for (let j = 0; j < DIMENSAO; j++) {
      const celula = document.createElement('td');
      celula.id=i+","+j;
      linha.appendChild(celula);
    }
    tabela.appendChild(linha);
  }
  document.getElementById('conteiner').appendChild(tabela);
}

function iniciar() {
  const intervalo = setInterval(function() {
    if (pos < vetMovimento.length) {
      moverRobo();
    } else {
      clearInterval(intervalo);
      verificarFim();
    }
  }, 550);
}

function verificarFim(){
  if(posRobo==posCasa){
    const cel = document.getElementById(posCasa);

    const roboImg = cel.querySelector("img[src*='robo.png']");
    if(roboImg){
      roboImg.classList.add("enter-house");
    }

    // depois de 1.2s coloca robo2
    setTimeout(()=>{
      cel.innerHTML = "";
      let r = document.createElement("img");
      r.src = "img/robo2.png";
      r.className = "imagens celebrate";
      cel.appendChild(r);

      mostrarMensagemVitoria();
      soltarFogos();
    }, 1200);

  } else {
    mostrarMensagem("Não chegou ao destino ❌");
  }
}

function mostrarMensagemVitoria(){
  let msg = document.createElement("div");
  msg.className = "victory-msg";
  msg.innerHTML = "🎉 O Robô chegou em casa! 🎉";
  document.body.appendChild(msg);
  setTimeout(()=> msg.remove(), 4000);
}

function mostrarMensagem(txt){
  let msg = document.createElement("div");
  msg.className = "info-msg";
  msg.textContent = txt;
  document.body.appendChild(msg);
  setTimeout(()=> msg.remove(), 3000);
}

function soltarFogos(){
  for(let i=0; i<12; i++){
    let fogo = document.createElement("div");
    fogo.className = "firework";
    fogo.style.left = Math.random()*100+"vw";
    fogo.style.top = Math.random()*60+"vh";
    document.body.appendChild(fogo);
    setTimeout(()=> fogo.remove(), 2500);
  }
}


function addRing(cell, dur){
  const ring = document.createElement('div');
  ring.className='fx-ring';
  cell.appendChild(ring);
  setTimeout(()=> ring.remove(), dur || 900);
}

function gameOver(msg){
  const cel = document.getElementById(posRobo);
  cel.classList.add('cell--shake');
  let roboImg = cel.querySelector("img");
  if(roboImg){
    roboImg.classList.add("explode");
    addRing(cel, 900);
    setTimeout(()=>{
      mostrarMensagem(msg);
      setTimeout(resetGame, 1500);
    },1200);
  } else {
    mostrarMensagem(msg);
    setTimeout(resetGame, 1500);
  }
}


function resetGame(){
  location.reload();
}

function autoMover(){
  selecionarVizinhos();
}
function selecionarVizinhos(){
  vizinhanca.length = 0;
  let [linhaCentral, colunaCentral] = posRobo.split(",").map(Number);
  for (let linha = linhaCentral - 1; linha <= linhaCentral + 1; linha++){
    for (let coluna = colunaCentral - 1; coluna <= colunaCentral + 1; coluna++){
      if(linha === linhaCentral && coluna === colunaCentral) continue;
      if (linha >= 0 && linha < DIMENSAO && coluna >= 0 && coluna < DIMENSAO){
        let id = linha+","+coluna;
        if(!buracos.has(id)) vizinhanca.push(id);
      }
    }
  }
  calcularDistancia();
}
function calcularDistancia(){
  if (posRobo === posCasa){ verificarFim(); return; }
  let menor = DIMENSAO*2, selecionado;
  for (let i = 0; i < vizinhanca.length; i++) {
    let [x1, y1] = vizinhanca[i].split(",").map(Number);
    let [x2, y2] = posCasa.split(",").map(Number);
    let dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    if (dist < menor) { menor = dist; selecionado = vizinhanca[i]; }
  }
  if (selecionado) {
    document.getElementById(posRobo).innerHTML = "";
    posRobo = selecionado;
    document.getElementById(posRobo).appendChild(robo);
    setTimeout(() => { selecionarVizinhos(); }, 350);
  }
}

function autoMoverBFS(){
  let caminho = bfs(posRobo, posCasa);
  if(!caminho){ alert("Não existe caminho!"); return; }
  let i=0;
  let intervalo = setInterval(()=>{
    if(i<caminho.length){
      document.getElementById(posRobo).innerHTML="";
      posRobo = caminho[i++];
      document.getElementById(posRobo).appendChild(robo);
    } else {
      clearInterval(intervalo);
      verificarFim();
    }
  },400);
}
function bfs(inicio, destino){
  let fila=[ [inicio] ];
  let visitado=new Set([inicio]);
  while(fila.length>0){
    let caminho=fila.shift();
    let atual=caminho[caminho.length-1];
    if(atual==destino) return caminho;

    let [l,c]=atual.split(",").map(Number);
    let moves=[[l+1,c],[l-1,c],[l,c+1],[l,c-1]];
    for(let [nl,nc] of moves){
      let id=nl+","+nc;
      if(nl>=0 && nl<DIMENSAO && nc>=0 && nc<DIMENSAO && !buracos.has(id) && !visitado.has(id)){
        visitado.add(id);
        fila.push([...caminho,id]);
      }
    }
  }
  return null;
}
