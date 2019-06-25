class Gorilla {
  constructor(x, y, playerNumber) {
    this.x = x;
    this.y = y;
    this.playerNumber = playerNumber;
    this.width = 50;
    this.height = 50;
    this.img = document.getElementById('temp-asset');
    this.img2 = document.getElementById('temp-asset-player2');
    this.alive = true;
    
    // if (this.playerNumber === 1) {
    //   this.x = Math.floor(Math.random() * 300);
    // } else {
    //   this.x = Math.floor((Math.random() * 300) + 860);
    // }
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
    // ct.beginPath();
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
}
