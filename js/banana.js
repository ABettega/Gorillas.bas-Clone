let bananas = [];
let imgBanana = document.getElementById('temp-banana');

let addBanana = function() {
  bananas.unshift(new Banana()); // unshift adds to FRONT of arrows array
  currBanana = bananas[0];
}

// Banana class
class Banana {
  constructor() {
    this.x = shootingCirc.x;
    this.y = shootingCirc.y;
    this.bananaTipCoords = {
      x: this.x + 20,
      y: this.y
    }
    this.velX = 0;
    this.velY = 0;
    this.speed = 0;
    this.firing = false;
    this.width = 25;
    this.height = 25;
    // this.damage = 1;
  };
  fireBanana() {
    if (mousePos && !this.firing) {
      this.speed = Math.min(shootingCirc.r,
                   distBetween(shootingCirc, mousePos)) / board.speedMod;
      this.velX = Math.cos(angleBetween(mousePos, shootingCirc)) * this.speed;
      this.velY = Math.sin(angleBetween(mousePos, shootingCirc)) * this.speed;
      this.firing = true;
    }
  }
  calcTrajectory() {
    if (this.y >= board.ground && !this.firing) {
      bananas.splice(1, 1);
      board.changeTurn();
      // if (board.playerTurn === 1) {
      //   // alert(`Turn change! Player 1 to Player 2!`);
      //   board.playerTurn = 2;
      //   board.takeTurn();
      // } else {
      //   // alert(`Turn change! Player 2 to Player 1!`);
      //   board.playerTurn = 1;
      //   board.takeTurn();
      // }
      addBanana();
    }
    if (this.y <= board.ground && this.firing) {
      this.velY += board.gravity;
      this.velX += board.windSpeed;
      this.x += this.velX;
      this.y += this.velY;
    } else {
      this.velX = 0;
      this.velY = 0;
      this.firing = false;
    }
  };
  calcBananaAngle() {
    let angle;
    if (this.firing) {
      angle = Math.atan2(this.velX, this.velY);
    } else if (mousePos && this == currBanana) {
      angle = Math.PI/2 - angleBetween(mousePos, shootingCirc);
    } else return;
  
    this.bananaTipCoords.x = this.x + 20*Math.sin(angle);
    this.bananaTipCoords.y = this.y + 20*Math.cos(angle);
  };
  drawBanana() {
    this.calcTrajectory();
    this.calcBananaAngle();
    ct.drawImage(imgBanana, this.x-15, this.y-15, this.width, this.height);
    if (board.playerTurn === 1) {
      if(this.crashWith(player2)) {
        board.gameWinner = 1;
        setTimeout(function() {
          player2.alive = false;
        }, 100);
      }
    } else {
      if (this.crashWith(player1)) {
        board.gameWinner = 2;
        setTimeout(function() {
          player1.alive = false;
        }, 100);
      }
    }
  };
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
  crashWith(gorilla) {
    return (
      this.bottom() > gorilla.top()
      && this.top() < gorilla.bottom()
      && this.right() > gorilla.left()
      && this.left() < gorilla.right())
  }
}