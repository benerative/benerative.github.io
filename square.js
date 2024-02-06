class Square {
        
    constructor(size, x, y, col, tag) {
        this.top = new Array(4);
        this.right = new Array(4);
        this.left = new Array(4);
        this.bottom = new Array(4);
        this.size = size;
        this.tag = tag;
        this.x = x;
        this.y = y;
        this.col = col;
        this.tag = tag;
        this.top[0] = x;
        this.top[1] = y;
        this.top[2] = x + size;
        this.top[3] = y;
        this.bottom[0] = x;
        this.bottom[1] = y + size;
        this.bottom[2] = x + size;
        this.bottom[3] = y + size;
        this.right[0] = x + size;
        this.right[1] = y;
        this.right[2] = x + size;
        this.right[3] = y + size;
        this.left[0] = x;
        this.left[1] = y;
        this.left[2] = x;
        this.left[3] = y + size; 
    }
    
    switch(col) {
      this.tag*=-1;
      this.col = col;
    }
    
    update() {
        canvas.strokeWeight(2);
        canvas.stroke(this.col);
        canvas.noStroke();
        //stroke(255);
       canvas.fill(this.col); //noFill();
       canvas.square(this.x, this.y, this.size);
    }
}
