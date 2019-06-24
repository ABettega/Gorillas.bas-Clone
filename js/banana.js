// array of all arrows
var arrows = [];
let imgBanana = document.getElementById('temp-banana');

// adjusts arrow speed
var speedMod = 5;

var addArrow = function() {
  arrows.unshift(new Arrow()); // unshift adds to FRONT of arrows array
  currArrow = arrows[0];
}

// Arrow prototype
function Arrow() {
  this.x = shootingCirc.x;
  this.y = shootingCirc.y;
  this.arrowTipCoords = {
    x: this.x+20,
    y: this.y
  };

  this.velX = 0;
  this.velY = 0;
  this.speed = 0;
  this.firing = false;
}
Arrow.prototype.fireArrow = function() {
  if (mousePos && !this.firing) {
    this.speed = Math.min(shootingCirc.r,
                 distBetween(shootingCirc, mousePos)) / speedMod;
    this.velX = Math.cos(angleBetween(mousePos, shootingCirc))*this.speed;
    this.velY = Math.sin(angleBetween(mousePos, shootingCirc))*this.speed;
    this.firing = true;
  }
  board.changeTurn();
}
Arrow.prototype.calcTrajectory = function() {
  if (this.y >= board.ground && !this.firing) {
    arrows.splice(1, 1);
    if (board.playerTurn === 1) {
      alert(`Turn change! Player 1 to Player 2!`);
      board.playerTurn = 2;
      board.takeTurn();
    } else {
      alert(`Turn change! Player 2 to Player 1!`);
      board.playerTurn = 1;
      board.takeTurn();
    }
    addArrow();
  }
  if (this.y <= board.ground && this.firing) {
    this.velY += gravity;
    this.x += this.velX;
    this.y += this.velY;
  } else {
    this.velX = 0;
    this.velY = 0;
    this.firing = false;
  }
};
Arrow.prototype.calcArrowHead = function() {
  if (this.firing) {
    var angle = Math.atan2(this.velX, this.velY);
  } else if (mousePos && this == currArrow) {
    var angle = Math.PI/2 - angleBetween(mousePos, shootingCirc);
  } else return;

  this.arrowTipCoords.x = this.x + 20*Math.sin(angle);
  this.arrowTipCoords.y = this.y + 20*Math.cos(angle);
};
Arrow.prototype.drawArrow = function() {
  this.calcTrajectory();
  this.calcArrowHead();
  ct.drawImage(imgBanana, this.x-15, this.y-15, 25, 25);
};
