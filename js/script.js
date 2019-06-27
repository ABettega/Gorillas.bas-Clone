let ct;
let canvas = document.getElementById('canvas');
let drawnBack = false;
let board;
let animationFrame;
let backdrop = document.getElementById('backdrop');

window.onload = function () {
  ct = canvas.getContext('2d');
  let startButton = document.getElementById("start-button");
  let restartButton = document.getElementById('restart-button');;
  startButton.onclick = function () {
    soundtrack.play();
    board = new Board();
    board.start();
    main();
    startButton.removeAttribute('id');
    startButton.setAttribute('id', 'restart-button');
    restartButton = document.getElementById('restart-button');
    restartButton.innerHTML = ('Restart Game');
    restartButton.onclick = function() {
      board.restart();
    }
  };
}

function weightedRandom(spec) {
  let i, sum=0, r=Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

let distBetween = function(p1, p2) {
  return Math.sqrt( Math.pow((p2.x-p1.x), 2)
  + Math.pow((p2.y-p1.y), 2) );
}

let angleBetween = function (p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

let getAimCoords = function (mousePos) {
  let angle = Math.PI / 2 - angleBetween(mousePos, shootingCirc);
  let angleExtra = Math.PI/180*5;
  let distance = Math.min(distBetween(shootingCirc, mousePos), shootingCirc.r);
  let x = shootingCirc.x + distance * Math.sin(angle-angleExtra);
  let y = shootingCirc.y + distance * Math.cos(angle-angleExtra);
  let x2 = shootingCirc.x + distance * Math.sin(angle+angleExtra);
  let y2 = shootingCirc.y + distance * Math.cos(angle+angleExtra);
  return {
    x: x,
    y: y,
    x2: x2,
    y2: y2,
    power: distance,
  };
}

let isInCircle = function (mousePos) {
  let distFromCenter = distBetween(drawBackCirc, mousePos);
  if (distFromCenter < drawBackCirc.r) return true;
  else return false;
}

let isFiredBanana = function () {
  if (mousePos && drawnBack && mouseUp) {
    drawnBack = false;
    firedBanana = true;
  }
}

let isDrawnBack = function () {
  if (mousePos && isInCircle(mousePos)) {
    if (mouseDown){
      drawnBack = true;
    } 
    else if (mouseUp) drawnBack = false;
  }
}

let update = function () {
  board.frames += 1;
  isDrawnBack();
  isFiredBanana();
  if (firedBanana) {
    currBanana.fireBanana();
    firedBanana = false;
  }
  ct.clearRect(0, 0, 1200, 600);
}

let render = function () {
  board.drawBoard();
  board.buildingPainter();
  player1.drawPlayer(player1.x, player1.y);
  player2.drawPlayer(player2.x, player2.y);
  drawAimer();
  bananas[0].drawBanana();
  board.takeTurn();
}

let drawAimer = function () {
  if (drawnBack) {
    aimCoords = getAimCoords(mousePos);
    ct.beginPath();
    ct.moveTo(aimCoords.x, aimCoords.y);
    ct.lineTo(shootingCirc.x, shootingCirc.y);
    ct.lineTo(aimCoords.x2, aimCoords.y2);
    ct.closePath();
    ct.lineWidth = 2;
    ct.fillStyle = `rgba(${2.55 * aimCoords.power},${0},${0},0.8)`;
    ct.fill();
    ct.beginPath();
    ct.moveTo(aimCoords.x, aimCoords.y);
    ct.lineTo(shootingCirc.x, shootingCirc.y);
    ct.lineTo(aimCoords.x2, aimCoords.y2);
    ct.closePath();
    ct.lineWidth = 2;
    ct.strokeStyle = "rgba(255,255,255,1)";
    ct.stroke();
  }
}

let main = function () {
  update();
  render();
  if (!player1.alive && player1.lives === 0) {
    setTimeout(function() {
      cancelAnimationFrame(animationFrame);
      board.stop();
    }, 300);
  } else if (!player2.alive && player2.lives === 0) {
    setTimeout(function() {
      cancelAnimationFrame(animationFrame);
      board.stop();
    }, 300);
  } else {
    animationframe = requestAnimationFrame(main);
  }
}
