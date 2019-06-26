let buildings = [];

class Building {
  constructor(x) {
    this.x = x;
    this.y = 500 - (Math.floor(Math.random() * 200));
    this.width = 200 - (Math.floor(Math.random() * 100));
    board.accruedWidth += this.width;

    this.color = 'rgba(26,39,62,0.5)';
    this.alpha = 'rgba(69, 69, 69, 1)';
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
    return 600;
  }
}
