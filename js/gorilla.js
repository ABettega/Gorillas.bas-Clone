let player1;
let player2;
let drawBackCirc;
let shootingCirc;

class Gorilla {
  constructor(playerNumber) {
    this.x;
    this.y;
    this.playerNumber = playerNumber;
    this.width = 50;
    this.height = 50;
    this.img = document.getElementById('player');
    this.img2 = document.getElementById('player2');
    this.alive = true;
    this.buildingSpawn = this.selectBuilding(this.playerNumber);
    this.adjustXY(this.buildingSpawn);

    // this.x = this.adjustX(x);
    
    this.shootingCircle = {
      x: this.x,
      y: this.y - 120,
      r: 100
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
  }

  drawPlayer(x, y) {
    if (this.playerNumber === 2) {
      ct.drawImage(this.img2, x, y, 50, 50);
    } else {
      ct.drawImage(this.img, x, y, 50, 50);
    }
  }

  selectBuilding(playerNumber) {
    let randomBuilding;
    if (playerNumber === 1) {
      randomBuilding = Math.floor(Math.random() * 2);
    } else if (playerNumber === 2) {
      randomBuilding = Math.floor(Math.random() * 2) + buildings.length - 3;
    }
    return randomBuilding;
  }

  adjustXY(buildingNumber) {
    let building = buildings[buildingNumber];
    this.y = building.y - 50;
    if (this.playerNumber === 1) {
      this.x = building.x;
    }
    if (this.playerNumber === 2) {
      this.x = building.right() - 50;
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
}
