let ct;
let canvas = document.getElementById('canvas');
let gravity = 0.4;
let windSpeed = 0.0;
let drawnBack = false;
let firedArrow = false;
let currArrow;
let drawBackCirc;
let shootingCirc;
// let faixas = [];
// let obstaculos = [];

window.onload = function () {
  ct = canvas.getContext('2d');
  let startButton = document.getElementById("start-button");
  let restartButton = document.getElementById('restart-button');;
  startButton.onclick = function () {
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

let board = {
  frames: 0,
  start: function () {
    ct.width = 1200;
    ct.height = 600;
    this.clear();
    this.drawBoard();
    this.points = 0;
    this.ground = 400;
    this.groundThickness = 2;
    this.frames = 0;
    this.playerTurn = 1;
    board.takeTurn();
    addArrow();
    currArrow = arrows[0];
  },
  restart: function() {
    if (confirm('Are you sure you want to restart?')) {
      player1 = new Component(355, 1);
      player2 = new Component(355, 2);
      this.start();
    }
  },
  clearEnd: function () {
    if (this.interval !== undefined) {
      clearInterval(this.interval);
      // alert('Game restarting!');
    }
    this.frames = 0;
    this.points = 0;
    ct.clearRect(0, 0, ct.width, ct.height);
    player1 = new Component(340, 1);
    player2 = new Component(340, 2);
    // faixas = [];
  },
  clear: function () {
    ct.clearRect(0, 0, ct.width, ct.height);
  },
  stop: function () {
    clearInterval(this.interval);
    ct.clearRect(0, 0, 1200, 600);
    ct.fillStyle = 'black';
    ct.fillRect(0, 0, 1200, 600);
    ct.fill();
    ct.fillStyle = 'red';
    ct.font = '50px Arial'
    ct.fillText('Game Over!', 150, 100);
    // ct.fillStyle = 'white';
    // ct.fillText(`Your final score: ${this.points}`, 100, 150);
    // ct.fill();
  },
  drawBoard: function () {
    ct.beginPath();
    ct.fillStyle = 'rgba(3, 11, 124, 0.6)';
    ct.fillRect(0, 0, 1200, 400);
    ct.fill();
    ct.closePath();

    ct.beginPath();
    ct.fillStyle = '#454545';
    ct.fillRect(0, this.ground, 1200, this.groundThickness);
    ct.fill();
    ct.closePath();

    ct.beginPath();
    ct.fillStyle = '#545454';
    ct.fillRect(0, this.ground + this.groundThickness, 1200, 600);
    ct.fill();
    ct.closePath();

    ct.fillStyle = '#FFF';
    ct.fillText(this.frames, 10, 10);
  },
  takeTurn: function () {
    if (this.playerTurn === 1) {
      drawBackCirc = player1.drawbackCircle;
      shootingCirc = player1.shootingCircle;
      player1.drawShootingCircle();
    } else if (this.playerTurn === 2) {
      drawBackCirc = player2.drawbackCircle;
      shootingCirc = player2.shootingCircle;
      player2.drawShootingCircle();
    }
  },
  changeTurn: function() {
    if (this.playerTurn === 1)
      this.playerNumber = 2;
    else
      this.playerNumber = 1;
  }
  // score: function() {
  //   if (this.frames % 5 === 0)
  //     this.points++;
  //   ct.font = "18px arial";
  //   ct.fillStyle = "black";
  //   ct.fillText("Score: " + this.points, 10, 20);
  // }
};

class Component {
  constructor(y, playerNumber) {
    this.y = y;
    this.playerNumber = playerNumber;
    this.width = 50;
    this.height = 50;
    this.img = document.getElementById('temp-asset');
    this.img2 = document.getElementById('temp-asset-player2');

    if (this.playerNumber === 1) {
      this.x = Math.floor(Math.random() * 300);
    } else {
      this.x = Math.floor((Math.random() * 300) + 860);
    }
    this.shootingCircle = {
      x: this.x,
      y: this.y - 120,
      r: 75
    };

    this.drawbackCircle = {
      x: this.x,
      y: this.y - 120,
      r: 10
    };
  }

  update() {
    // if (this.player) {
    // this.drawPlayer(this.x, this.y);
    // } else {
    //   ct.fillStyle = 'red'
    //   ct.fillRect(this.x, this.y, this.width, this.height);
    // }
  }

  drawShootingCircle() {
    // if (this.playerNumber === 1) {
    //   if (this.shootingCircle.shootX - 150 < 0) {
    //     this.shootingCircle.shootX = 150;
    //   }
    // } else if (this.playerNumber === 2) {
    //   if (this.shootingCircle.shootX + 150 > 1200) {
    //     this.shootingCircle.shootX = 1050;
    //   }
    // }
    if (this.playerNumber === 1) {
      this.shootingCircle.x = this.x+25;
      this.drawbackCircle.x = this.x+25;
      this.shootingCircle.y = this.y+25;
      this.drawbackCircle.y = this.y+25;
    } else if (this.playerNumber === 2) {
      this.shootingCircle.x = this.x+25;
      this.drawbackCircle.x = this.x+25;
      this.shootingCircle.y = this.y+25;
      this.drawbackCircle.y = this.y+25;
    }
    // ct.beginPath();
    // ct.arc(this.shootingCircle.x, this.shootingCircle.y, this.shootingCircle.r, 0, 2 * Math.PI);
    // ct.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    // ct.stroke();
    // // ct.beginPath();
    // ct.arc(this.drawbackCircle.drawX, this.drawbackCircle.drawY, this.drawbackCircle.r, 0, 2 * Math.PI);
    // ct.stroke();
  }

  drawPlayer(x, y) {
    if (this.playerNumber === 2) {
      ct.drawImage(this.img2, x, y, 50, 50);
    } else {
      ct.drawImage(this.img, x, y, 50, 50);
    }
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.width;
  }
  top() {
    return this.y;
  }
  bottom() {
    return this.y + this.height;
  }
  crashWith(obstacle) {
    // if (obstacle.y >= player.top() - 10) {
    //   if ((player.left() > obstacle.left() || player.right() > obstacle.left()) &&
    //   (player.left() < obstacle.right() || player.right() < obstacle.right())) {
    //     return true;
    //   }
    // }
  }
}

let player1 = new Component(355, 1);
let player2 = new Component(355, 2);

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

let isFiredArrow = function () {
  if (mousePos && drawnBack && mouseUp) {
    drawnBack = false;
    firedArrow = true;
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
  isFiredArrow();
  if (firedArrow) {
    currArrow.fireArrow();
    firedArrow = false;
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
  arrows[0].drawArrow();
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
