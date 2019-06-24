class Building {
  constructor(x) {
    this.x = x;
    this.y = 600 - (Math.floor(Math.random() * 350));
    this.width = 200 - (Math.floor(Math.random() * 100));
    board.accruedWidth += this.width;
  }
}
