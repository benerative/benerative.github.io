class ArrayList extends Array {
  constructor() {
    super(...[]);
  }
  size() {
    return this.length;
  }
  add(x) {
    this.push(x);
  }
  get(i) {
    return this[i];
  }
  remove(i) {
    this.splice(i, 1);
  }
}

let ballsleft = new ArrayList();
let ballsright = new ArrayList();

let squareArrays = new ArrayList();
let balls = 1;
let ballspeed = 6;
let ballsize = 20;
let r;
let g;
let b;
let r2;
let g2;
let b2;
let colright;
let colleft;
let squareSize;
let border;
let squaresX;
let squaresY;
let x;
let y;
let minx;
let miny;
let maxx;
let maxy;
let font;
let totalleft;
let totalright;

let rgbSplit;
let rgbSplitPass;

let blurH, blurV, bloom;
let pass1, pass2, bloomPass;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
  setAll();
}

function setAll() {
  
  ballsleft = new ArrayList();
  ballsright = new ArrayList();
  squareArrays = new ArrayList();
  totalleft = 0;
  totalright = 0;
  r = int(random(0, 220));
  g = int(random(0, 256));
  b = int(random(0, 256));
  r2 = int(random(0, 256));
  g2 = int(random(0, 220));
  b2 = int(random(0, 256));
  colright = color(r, g, b);
  colleft = color(r2, g2, b2);
  squareSize = 40;
  border = 2 * squareSize

  squaresX = Math.floor((width - 2 * border) / squareSize);
  squaresY = Math.floor((height - 2 * border) / squareSize);

  for (let i = 0; i < squaresY; i++) {
    squareArrays.add(new ArrayList());
    for (let j = 0; j < squaresX; j++) {
      let col;
      let tag;
      if (j > squaresX / 2 - 1) {
        col = color(r, g, b);
        tag = 1;
      } else {
        col = color(r2, g2, b2);
        tag = -1;
      }
      squareArrays
        .get(i)
        .add(
        new Square(
        squareSize,
        border + squareSize * j,
        border + squareSize * i,
        col,
        tag
        )
        );
    }
    document.getElementById("mh2").style.webkitTextStrokeColor = colright;
    document.getElementById("mh2").style.textShadow = "2px 2px  " + colleft + ", 3px 3px #000000";
  }

  minx = squareArrays.get(0).get(0).x;
  maxx =
    squareArrays
    .get(squareArrays.size() - 1)
    .get(squareArrays.get(squareArrays.size() - 1).size() - 1).x +
    squareSize;
  miny = squareArrays.get(0).get(0).y;
  maxy =
    squareArrays
    .get(squareArrays.size() - 1)
    .get(squareArrays.get(squareArrays.size() - 1).size() - 1).y +
    squareSize;

  for (let i = 0; i < balls; i++) {
    ballsleft.add(new Ball(ballsize, int(random(minx+ballsize, maxx / 2 - ballsize)), int(random(miny+ballsize, maxy-ballsize)), colleft, ballspeed, minx, miny, maxx, maxy, 1));
  }

  for (let i = 0; i < balls; i++) {
    ballsright.add(new Ball(ballsize, int(random(maxx / 2 + ballsize, maxx  - ballsize)), int(random(miny+ballsize, maxy-ballsize)), colright, ballspeed, minx, miny, maxx, maxy, -1));
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  canvas = createGraphics(windowWidth, windowHeight);
  rgbSplitPass = createGraphics(width, height, WEBGL);
  pass1 = createGraphics(width, height, WEBGL);
  pass2 = createGraphics(width, height, WEBGL);
  bloomPass = createGraphics(width, height, WEBGL);
  
  rgbSplitPass.noStroke();
  pass1.noStroke();
  pass2.noStroke();
  bloomPass.noStroke(); 
  noStroke();

  var modal = document.getElementById("myModal")

  frameRate(50);
  smooth(8);
  ellipseMode(CENTER);

  setAll();
}

function preload() {
  font = loadFont('Rajdhani-Medium.ttf');
  rgbSplit = loadShader('bloom.vert', 'rgbSplit.frag');
  blurH = loadShader('bloom.vert', 'blur.frag');
  blurV = loadShader('bloom.vert', 'blur.frag');
  bloom = loadShader('bloom.vert', 'bloom.frag');
}

function updateSquares() {
  let lines = new ArrayList();
  for (let i = 0; i < squaresY; i++) {
    for (let j = 0; j < squaresX; j++) {
      if (j != squaresX - 1) {
        if (
          squareArrays.get(i).get(j).tag !=
          squareArrays.get(i).get(j + 1).tag
          ) {
          lines.add(squareArrays.get(i).get(j).right);
        }
      }
      if (j != 0) {
        if (
          squareArrays.get(i).get(j).tag !=
          squareArrays.get(i).get(j - 1).tag
          ) {
          lines.add(squareArrays.get(i).get(j).left);
        }
      }
      if (i != squaresY - 1) {
        if (
          squareArrays.get(i).get(j).tag !=
          squareArrays.get(i + 1).get(j).tag
          ) {
          lines.add(squareArrays.get(i).get(j).bottom);
        }
      }
      if (i != 0) {
        if (
          squareArrays.get(i).get(j).tag !=
          squareArrays.get(i - 1).get(j).tag
          ) {
          lines.add(squareArrays.get(i).get(j).top);
        }
      }
      squareArrays.get(i).get(j).update();
    }
  }
  return lines;
}

function handleEvents() {
  var modal = document.getElementById("myModal");

  window.onclick = function(event) {
    if (event.target.className == "close") {
      modal.style.display = "none";
    } else {
      modal.style.display = "block";
    }
    if (event.target.id == "submit") {
      //modal.style.display = "none";
      var num = new FormData(document.getElementById("balls"))
        for (const pair of num.entries()) {
        balls = parseInt(pair[1]);
      }

      var speed = new FormData(document.getElementById("ball-speed"))
        for (const pair of speed.entries()) {
        ballspeed = parseInt(pair[1]);
      }
      var size = new FormData(document.getElementById("ball-size"))
        for (const pair of size.entries()) {
        ballsize = parseInt(pair[1]);
      }

      setAll();
      modal.style.display = "none";
    }
  }
}

function drawText() {
  canvas.textFont(font);
  canvas.textSize(40);
  canvas.textAlign(LEFT, TOP);
  canvas.fill(255);
  canvas.stroke(255);
  canvas.text("Score: " + ballsleft.get(0).count, minx, miny - 1.2*squareSize, 300, 300);
  canvas.textAlign(RIGHT, TOP);
  canvas.text("Score: " + ballsright.get(0).count, maxx - 300, miny - 1.2*squareSize, 300, 300);
}

function shaderSet() {

  rgbSplitPass.shader(rgbSplit);  
  pass1.shader(blurH);
  pass2.shader(blurV);
  bloomPass.shader(bloom);
  
  blurH.setUniform('tex0', canvas);
  blurH.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurH.setUniform('direction', [1.0, 0.0]);

  pass1.rect(0,0,width, height);

  blurV.setUniform('tex0', pass1);
  blurV.setUniform('texelSize', [1.0/width, 1.0/height]);
  blurV.setUniform('direction', [0.0, 1.0]);

  pass2.rect(0,0,width, height);
    
  bloom.setUniform('tex0', pass2);
  bloom.setUniform('tex1', canvas);

  // also send the mouse to control the amount of bloom
  bloom.setUniform('mouseX', 0.9);

  // we need some geometry for the bloom pass
  bloomPass.rect(0,0,width, height);
  
  rgbSplit.setUniform("uTexture", bloomPass);
  rgbSplit.setUniform("uOffset", [.002, .002]);
  rgbSplit.setUniform("middle", [width/2, height/2]);
    
  rgbSplitPass.rect(0, 0, width, height);
  
  // Finally draw the image
  translate(-width/2,-height/2,0);
  image(rgbSplitPass, 0, 0);
  
}

function draw() {
  
  canvas.background(0, 0, 0);

  for (let i = 0; i < balls; i++) {
    ballsleft.get(i).update();
    ballsright.get(i).update();
  }

  let lines = updateSquares();
  for (let i = 0; i < lines.size() - 1; i++) {
    canvas.strokeWeight(6);
    canvas.stroke(255);
    canvas.line(
      lines.get(i)[0],
      lines.get(i)[1],
      lines.get(i)[2],
      lines.get(i)[3]
      );
    canvas.noFill();
    canvas.rect(minx, miny, squaresX * squareSize, squaresY * squareSize);
  }
  for (let i = 0; i < balls; i++) {
    ballsleft.get(i).draw();
    ballsright.get(i).draw();
  }
  drawText();
  shaderSet();
  handleEvents();
  //translate(-width/2,-height/2,0);

}
