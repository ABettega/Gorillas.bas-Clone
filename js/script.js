let player1 = new Gorilla(355, 1);
let player2 = new Gorilla(355, 2);
let ct;
let canvas = document.getElementById('canvas');
let gravity = 0.4;
let windSpeed = 0.0;
let drawnBack = false;
let firedBanana = false;
let currBanana;
let drawBackCirc;
let shootingCirc;
let board;

window.onload = function () {
  ct = canvas.getContext('2d');
  let startButton = document.getElementById("start-button");
  let restartButton = document.getElementById('restart-button');;
  startButton.onclick = function () {
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

const updateGameArea = () => {
  // board.drawBoard();
  // requestAnimationFrame(board.drawBoard);
  // player1.drawShootingCircle();
  // player2.drawShootingCircle();
  // updateFaixas();
  // player.newPos();
  // updateObstacles();
  // checkGameOver();
  // road.score();
};

// // const updateFaixas = () => {
// //   for (let i = 0; i < faixas.length; i++) {
// //     faixas[i].y += 10;
// //     faixas[i].update();
// //     if (faixas[i].y > 620)
// //       faixas.shift();
// //   }
// //   road.frames += 1;
// //   if (road.frames % 5 === 0) {
// //     faixas.push(new Faixas());
// //   }
// }


// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 37: // left arrow
//       if (player.x >= 0)
//         player.x -= 30;
//       break;
//     case 39: // right arrow
//     if (player.x < 350)
//       player.x += 30;
//     break;
//   }
// };

// function updateObstacles() {
//   for (let i = 0; i < obstaculos.length; i++) {
//     obstaculos[i].y += 10;
//     obstaculos[i].update();
//     if (obstaculos[i].y > 580)
//       obstaculos.shift();
//   }
//   if (road.frames % 80 === 0) {
//     let minWidth = 100;
//     let maxWidth = 300;
//     let width = Math.floor(
//       Math.random() * (maxWidth - minWidth + 1) + minWidth
//     );
//     let x = Math.floor(Math.random() * (400)) - width;
//     if (x < 0)
//       x = 0;
//     let componente = new Component(width, 20, x, 0, false, false);
//     obstaculos.push(componente);
//   }
// }

// function checkGameOver() {
//   let crashed = obstaculos.some(function(obstacle) {
//     return player.crashWith(obstacle);
//   });

//   if (crashed) {
//     road.stop();
//   }

/*
 * Event Listeners *
 */
let mousePos;
let mouseDown = false;
let mouseUp = false;

addEventListener('mousemove', function (evt) {
  mousePos = getMousePos(canvas, evt);
}, false);
addEventListener('mousedown', function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = true;
  mouseUp = false;
}, false);
addEventListener('mouseup', function (evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = false;
  mouseUp = true;
}, false);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

var distBetween = function(p1, p2) {
  return Math.sqrt( Math.pow((p2.x-p1.x), 2)
  + Math.pow((p2.y-p1.y), 2) );
}

let angleBetween = function (p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

let getAimCoords = function (mousePos) {
  let angle = Math.PI / 2 - angleBetween(mousePos, shootingCirc);
  let distance = Math.min(distBetween(shootingCirc, mousePos), shootingCirc.r);
  let x = shootingCirc.x + distance * Math.sin(angle);
  let y = shootingCirc.y + distance * Math.cos(angle);
  return {
    x: x,
    y: y
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
  // clear the canvas
  ct.clearRect(0, 0, 1200, 600);
}

let render = function () {
  // if(mousePos) writeInfo(mousePos);
  board.drawBoard();
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
    ct.strokeStyle = "rgba(0,0,0,1)";
    ct.stroke();
  }
}

let main = function () {
  update();
  render();
  requestAnimationFrame(main);
}
