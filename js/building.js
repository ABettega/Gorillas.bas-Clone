let buildings = [];

class Building {
  constructor(x) {
    this.x = x;
    this.y = 500 - (Math.floor(Math.random() * 200));
    this.width = 200 - (Math.floor(Math.random() * 100));
    board.accruedWidth += this.width;

    // this.randomColor = this.randomColorPicker();
    this.color = 'rgba(26,39,62,1)';
    // this.color = 'rgba(139,0,0,1)';
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
  // randomColorPicker() {
  //   let set = {'red': 0.25,
  //   'blue': 0.25,
  //   'black': 0.25,
  //   'grey': 0.25}
  //   let weighted = weightedRandom(set);
  //   return weighted;
  // }
}
