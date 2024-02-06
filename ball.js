class Ball {

  constructor(size, x, y, col, speed, minx, miny, maxx, maxy, tag) {
    this.size = size;
    this.x = x;
    this.y = y;
    this.col = col;
    this.xSpeed = speed;
    this.ySpeed = speed;
    this.maxx = maxx;
    this.minx = minx;
    this.maxy = maxy;
    this.miny = miny;
    this.tag = tag;
    this.count = 0;
  }
  update() {
    // update position
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x - this.size / 1.2 <= this.minx || this.x + this.size >= this.maxx) {
      this.xSpeed *= -1;
      //return;
    }
    if (this.y - this.size / 1.2 <= this.miny || this.y + this.size >= this.maxy) {
      this.ySpeed *= -1;
      //return;
    } // use collision algo to find which sqare the circle is touching of the opposite color
    // go throgh every square and check how close its closest edge is to the circle, if its smaller than circle radius its a hit
    this.count = 0;
    for (let i = 0; i < squaresY; i++) {
      for (let j = 0; j < squaresX; j++) {
        let squarex = squareArrays.get(i).get(j).x;
        let squarey = squareArrays.get(i).get(j).y;
        let squaresize = squareArrays.get(i).get(j).size;
        let squaretag = squareArrays.get(i).get(j).tag;
        let testX = this.x;
        let testY = this.y;
        if (squaretag != this.tag) {
          this.count++;
        } // find which edge the circle is closest to
        if (this.x < squarex) {
          testX = squarex; // left edge
        } else if (this.x > squarex + squaresize) {
          testX = squarex + squaresize; // right edge
        }
        if (this.y < squarey) {
          testY = squarey; // top edge
        } else if (this.y > squarey + squaresize) {
          testY = squarey + squaresize; // bottom edge
        } // find distance to edge
        let distX = abs(this.x - testX);
        let distY = abs(this.y - testY);
        let distance = sqrt(distX * distX + distY * distY);
        if (distance < this.size && squaretag == this.tag) {
          squareArrays.get(i).get(j).col = this.col;
          squareArrays.get(i).get(j).tag = squaretag * -1;
          if (distX > distY) {
            this.xSpeed *= -1;
          }
          if (distX < distY) {
            this.ySpeed *= -1;
          }
          return;
        }
      }
    }
  }

  draw() {
    canvas.strokeWeight(2);
    canvas.stroke(255);
    canvas.noStroke();
    canvas.fill(255); //noFill();
    canvas.ellipse(this.x, this.y, this.size, this.size);
  }
}
