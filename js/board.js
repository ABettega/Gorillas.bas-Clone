class Board {
  constructor() {
    this.frames = 0;
  }
  
  start() {
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
      player1 = new Gorilla(355, 1);
      player2 = new Gorilla(355, 2);
      this.start();
    }
  }
  clear() {
    ct.clearRect(0, 0, ct.width, ct.height);
  }
  stop() {
    clearInterval(this.interval);
    ct.clearRect(0, 0, 1200, 600);
    ct.fillStyle = 'black';
    ct.fillRect(0, 0, 1200, 600);
    ct.fill();
    ct.fillStyle = 'red';
    ct.font = '50px Arial'
    ct.fillText('Game Over!', 150, 100);
  }
  drawBoard() {
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
    ct.fillText(this.frames, 2, 10);
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
    if (this.playerTurn === 1)
      this.playerNumber = 2;
    else
      this.playerNumber = 1;
  }
};
