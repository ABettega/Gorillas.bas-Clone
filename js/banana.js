let bananas = [];
let imgBanana1 = document.getElementById('banana-frame1');
let imgBanana4 = document.getElementById('banana-frame2');
let imgBanana2 = document.getElementById('banana-frame3');
let imgBanana3 = document.getElementById('banana-frame4');
let firedBanana = false;
let currBanana;
let frameCount = 0;

let addBanana = function () {
  bananas.unshift(new Banana());
  currBanana = bananas[0];
}

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
    this.collided = false;
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
    if (this.y > 600) {
      this.collided = true;
      if (justHit)
        explosionDeath.play();
      explosionMinor.play();
    }
    if (this.collided && !this.firing) {
      bananas.splice(1, 1);
      board.changeTurn();
      addBanana();
    }
    if (!this.collided && this.firing) {
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
      angle = Math.PI / 2 - angleBetween(mousePos, shootingCirc);
    } else return;

    this.bananaTipCoords.x = this.x + 20 * Math.sin(angle);
    this.bananaTipCoords.y = this.y + 20 * Math.cos(angle);
  };
  drawBanana() {
    this.calcTrajectory();
    this.calcBananaAngle();
    if (!this.firing) {
      ct.drawImage(imgBanana1, this.x - 15, this.y - 15, this.width, this.height);
    } else {
      switch (frameCount % 4) {
        case 0:
          ct.drawImage(imgBanana1, this.x - 15, this.y - 15, this.width, this.height);
          frameCount += 1;
          break;
        case 1:
          ct.drawImage(imgBanana2, this.x - 15, this.y - 15, this.width, this.height);
          frameCount += 1;
          break;
        case 2:
          ct.drawImage(imgBanana3, this.x - 15, this.y - 15, this.width, this.height);
          frameCount += 1;
          break;
        case 3:
          ct.drawImage(imgBanana4, this.x - 15, this.y - 15, this.width, this.height);
          frameCount += 1;
          break;
        default:
          ct.drawImage(imgBanana1, this.x - 15, this.y - 15, this.width, this.height);
          break;
      }
    }
    if (board.playerTurn === 1) {
      if (this.crashWith(player2) && !justHit) {
        player2.loseLife();
      }
    } else {
      if (this.crashWith(player1) && !justHit) {
        player1.loseLife();
      }
    }
    for (let i = 0; i < buildings.length; i += 1) {
      this.checkCollision(buildings[i]);
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
    let retorno = this.bottom() > gorilla.top() &&
    this.top() < gorilla.bottom() &&
    this.right() > gorilla.left() &&
    this.left() < gorilla.right();
    if (retorno && !justHit) {
      gorilla.loseLife();
    }
    return retorno;
  }
  checkCollision(building) {
    if (this.bottom() > building.top() &&
      this.top() < building.bottom() &&
      this.right() > building.left() &&
      this.left() < building.right()) {
      this.collided = true;
      if (board.gameWinner === 0) {
        if (!justHit)
          explosionMinor.play();
        else
          explosionDeath.play();
      }
    }
  }
}