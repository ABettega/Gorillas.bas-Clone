class Building {
  constructor(x) {
    this.x = x;
    this.y = 500 - (Math.floor(Math.random() * 300));
    this.width = 200 - (Math.floor(Math.random() * 100));
    board.accruedWidth += this.width;

    let randomColor = Math.floor(Math.random())
    this.color = 'rgba(139,0,0,1)';
    this.alpha = 'rgba(80, 0, 0, 1)';
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
  randomColorPicker() {
    let set = {'rgba(139,0,0,1)': 0.15,
    'rgba(0,139,0,1)': 0.15,
    'rgba(0,0,139,1)': 0.15,
    'rgba(139,139,0,1)': 0.15,
    'rgba(0,139,139,1)': 0.15,
    'rgba(139,0,139,1)': 0.15,
    'rgba(139,139,139,1)': 0.1
    }
    let weighted = weightedRandom(set);
    return weighted;
  }
}

/*

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

*/