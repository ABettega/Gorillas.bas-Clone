class Board {
  constructor() {
    this.frames = 0;
    this.speedMod = 4;
    this.gravity = 0.4;
    this.windSpeed = 0.0;
    this.accruedWidth = 0;
  }
  
  start() {
    this.gameWinner = 0;
    this.buildingCreator();
    player1 = new Gorilla(1);
    player2 = new Gorilla(2);
    ct.width = 1200;
    ct.height = 600;
    this.clear();
    this.drawBoard();
    this.points = 0;
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
    setTimeout(function() {
      while (soundtrack.volume > 0) {
        console.log(`Soundtrack Volume before: ${soundtrack.volume}`);
        soundtrack.volume -= 0.00001;
        soundtrack.play();
        console.log(`Soundtrack Volume after: ${soundtrack.volume}`);
      }
    }, 100);
    ct.clearRect(0, 0, 1200, 600);
    ct.fillStyle = 'black';
    ct.fillRect(0, 0, 1200, 600);
    ct.fill();
    ct.fillStyle = 'darkred';
    ct.font = '40px Arial'
    ct.fillText(` - Game over -`, 470, 300);
    ct.fillText(`The winner is player ${this.gameWinner}!`, 400, 340);
    ct.drawImage(imgBanana1, 880, 280)
  }
  drawBoard() {
    ct.globalAlpha = 0.4;
    ct.drawImage(backdrop, 0, 0, 1200, 600);
    ct.globalAlpha = 1;

    ct.font = '10px Arial'
    ct.fillStyle = '#FFF';
    ct.fillText(`Wind Speed: ${this.windSpeed}`, 2, 10);
    ct.fillText(`Gravity: ${this.gravity}`, 2, 20);

    ct.globalAlpha = 0.6;
    for (let i = 0; i < player1.lives; i += 1) {
      ct.drawImage(lifeImage, 50 + (70 * i), 50, 50, 50);
    }
    for (let i = 0; i < player2.lives; i += 1) {
      ct.drawImage(lifeImage, 1100 - (70 * i), 50, 50, 50);
    }
    ct.globalAlpha = 1.0;
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
    justHit = false;
  }
  moonGravity() {
    this.gravity = 0.2;
  }
  jupiterGravity() {
    this.gravity = 0.6;
  }
  chicagoWind() {
    this.windSpeed = 1.0;
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
  buildingCreator() {
    while (this.accruedWidth < 1200) {
      buildings.push(new Building(this.accruedWidth));
    }
    let difAltura = buildings[0].y - buildings[1].y;
    if (difAltura < 0)
      difAltura *= -1;
    if (difAltura > 50) {
      buildings[1].y = buildings[0].y - 50;
    }
    difAltura = buildings[buildings.length-1] - buildings[buildings.length-2];
    if (difAltura < 0)
      difAltura *= -1;
    if (difAltura > 50) {
      buildings[buildings.length-2].y = buildings[buildings.length-1].y - 50;
    }
  }
  buildingPainter() {
    for(let i = 0; i < buildings.length; i += 1) {
      ct.fillStyle = buildings[i].color;
      ct.fillRect(buildings[i].x, buildings[i].y, buildings[i].width, 600-buildings[i].y);
      ct.fillStyle = buildings[i].alpha;
      ct.fillRect(buildings[i].x, buildings[i].y-5, buildings[i].width, 5);
      ct.fillRect(buildings[i].x, buildings[i].y, 5, 600-buildings[i].y);
      ct.fillRect(buildings[i].right()-5, buildings[i].y, 5, 600-buildings[i].y);
    }
  }
};
