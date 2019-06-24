class Board {
  constructor() {
    this.frames = 0;
    this.speedMod = 4;
    this.gravity = 0.4;
    this.windSpeed = 0.0;
  }
  
  start() {
    this.gameWinner = 0;
    player1 = new Gorilla(355, 1);
    player2 = new Gorilla(355, 2);
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
    addBanana();
    currBanana = bananas[0];
  };
  restart() {
    if (confirm('Are you sure you want to restart?')) {
      location.reload();
    }
  }
  clear() {
    ct.clearRect(0, 0, ct.width, ct.height);
  }
  stop() {
    cancelAnimationFrame(animationFrame);
    ct.clearRect(0, 0, 1200, 600);
    ct.fillStyle = 'black';
    ct.fillRect(0, 0, 1200, 600);
    ct.fill();
    ct.fillStyle = 'red';
    ct.font = '50px Arial'
    ct.fillText(`Game Over! Winner is Player ${this.gameWinner}`, 150, 100);
  }
  drawBoard() {
    ct.drawImage(backdrop, 0, 0, 1200, 600);

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

    ct.font = '10px Arial'
    ct.fillStyle = '#FFF';
    ct.fillText(`Wind Speed: ${this.windSpeed}`, 2, 10);
    ct.fillText(`Gravity: ${this.gravity}`, 2, 20);
  }
  takeTurn() {
    if (this.playerTurn === 1) {
      drawBackCirc = player1.drawbackCircle;
      shootingCirc = player1.shootingCircle;
      player1.drawShootingCircle();
    } else if (this.playerTurn === 2) {
      drawBackCirc = player2.drawbackCircle;
      shootingCirc = player2.shootingCircle;
      player2.drawShootingCircle();
    }
  }
  changeTurn() {
    if (this.playerTurn === 1) {
      this.playerTurn = 2;
      this.takeTurn();
    } else {
      this.playerTurn = 1;
      this.takeTurn();
    }
    this.windSpeedChanger();
    this.gravityChanger();
  }
  moonGravity() {
    this.gravity = 0.2;
  }
  jupiterGravity() {
    this.gravity = 0.6;
  }
  windSpeedChanger() {
    let set = {0: 0.04, 
      0.1: 0.08, 
      0.2: 0.12, 
      0.3: 0.16, 
      0.4: 0.2,
      0.5: 0.16,
      0.6: 0.12,
      0.7: 0.08,
      0.8: 0.04};
    let weighted = weightedRandom(set);
    this.windSpeed = parseFloat((weighted - 0.4).toFixed(2));
    // if ()
  }
  gravityChanger() {
    let set = {0: 0.1,
      0.2: 0.1,
      0.4: 0.7,
      0.6: 0.05,
      0.8: 0.05}
    let weighted = weightedRandom(set);
    weighted = (weighted - 0.4) * 0.3;
    this.gravity = 0.4 + parseFloat((weighted).toFixed(2));
  }
};
