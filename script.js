let ct;
let canvas = document.getElementById('canvas');
let gravity = 0.4;
let windSpeed = 0.0;
// let faixas = [];
// let obstaculos = [];

window.onload = function () {
  ct = canvas.getContext('2d');
  document.getElementById("start-button").onclick = function () {
    board.clearEnd();
    board.start();
  };
}

let board = {
  frames: 0,
  start: function () {
    ct.width = 1200;
    ct.height = 600;
    this.clear();
    this.drawBoard();
    this.interval = setInterval(updateGameArea, 20);
    this.points = 0;
    this.ground = 400;
    this.groundThickness = 3;
    this.frames = 0;
    this.playerTurn = 1;
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
  takeTurn: function() {
    if (this.playerTurn === 1) {
      player1.drawShootingCircle();
    } else if (this.playerTurn === 2) {
      player2.drawShootingCircle();
    }
  }
  // score: function() {
  //   if (this.frames % 5 === 0)
  //     this.points++;
  //   ct.font = "18px arial";
  //   ct.fillStyle = "black";
  //   ct.fillText("Score: " + this.points, 10, 20);
  // }
};


// class Banana {
//   constructor() {
//     this.width = 5;
//     this.height = 20;
//     this.color = 'white';
//     this.x = 197;
//     this.y = -20;
//   }

//   update() {
//     ct.fillStyle = this.color;
//     ct.fillRect(this.x, this.y, this.width, this.height);
//   }

//   newPos() {
//     this.y += this.speedY;
//   }
// };

class Component {
  constructor(y, playerNumber) {
    this.y = y;
    this.playerNumber = playerNumber;
    this.width = 40;
    this.height = 60;
    this.img = document.getElementById('temp-asset');

    if (this.playerNumber === 1) {
      this.x = Math.floor(Math.random() * 300);
    } else {
      this.x = Math.floor((Math.random() * 300) + 860);
    }
    this.shootingCircle = {
      shootX: this.x,
      shootY: this.y - 120,
      r: 75
    };

    this.drawbackCircle = {
      draw: this.x,
      drawY: this.y - 120,
      r: 2
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
      this.shootingCircle.shootX = 150;
      this.drawbackCircle.drawX = 150;
    } else if (this.playerNumber === 2) {
      this.shootingCircle.shootX = 1050;
      this.drawbackCircle.drawY = 1050;
    }
    ct.beginPath();
    ct.arc(this.shootingCircle.shootX, this.shootingCircle.shootY, this.shootingCircle.r, 0, 2 * Math.PI);
    ct.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ct.stroke();
    ct.beginPath();
    ct.arc(this.drawbackCircle.drawX, this.drawbackCircle.drawY, this.drawbackCircle.r, 0, 2 * Math.PI);
    ct.stroke();
  }

  drawPlayer(x, y) {
    ct.drawImage(this.img, x, y, 40, 60);
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

let player1 = new Component(340, 1);
let player2 = new Component(340, 2);

const updateGameArea = () => {
  board.clear();
  board.drawBoard();
  player1.drawPlayer(player1.x, player1.y);
  player2.drawPlayer(player2.x, player2.y);
  board.takeTurn();
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

addEventListener('mousemove', function(evt) {
  mousePos = getMousePos(canvas, evt);
});

addEventListener('mousedown', function(evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = true;
  mouseUp = false;
});

addEventListener('mouseup', function(evt) {
  mousePos = getMousePos(canvas, evt);
  mouseDown = false;
  mouseUp = true;
});

function getMousePos(canvas, evt) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX,
    y: evt.clientY
  }
}