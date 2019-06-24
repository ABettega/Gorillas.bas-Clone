let player1;
let player2;
let ct;
let canvas = document.getElementById('canvas');
let drawnBack = false;
let firedBanana = false;
let currBanana;
let drawBackCirc;
let shootingCirc;
let board;
let animationFrame;

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

// function checkGameOver() {
//   let crashed = obstaculos.some(function(obstacle) {
//     return player.crashWith(obstacle);
//   });

//   if (crashed) {
//     road.stop();
//   }

let distBetween = function(p1, p2) {
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
  ct.clearRect(0, 0, 1200, 600);
}

let render = function () {
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
  if (!player1.alive) {
    cancelAnimationFrame(animationFrame);
    board.stop();
  } else if (!player2.alive) {
    cancelAnimationFrame(animationFrame);
    board.stop();
  } else {
    animationframe = requestAnimationFrame(main);
  }
}
