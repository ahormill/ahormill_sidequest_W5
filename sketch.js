let worldWidth;
let targetX = 0;
let currentX = 0;
let easing = 0.02;

let currentScreen = 0;

let button;

let snowflakes = [];
let petals = [];
let fireflies = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  worldWidth = width * 3;

  // Create seasonal particles
  for (let i = 0; i < 100; i++) {
    snowflakes.push(new Snow());
    petals.push(new Petal());
    fireflies.push(new Firefly());
  }

  // Button
  button = createButton("transition");
  button.position(width / 2 - 50, height - 60);
  button.mousePressed(nextSeason);
}

function draw() {
  background(20); // Only ONE background call

  // Smooth camera movement
  currentX = lerp(currentX, targetX, easing);

  push();
  translate(-currentX, 0);

  // Draw all three worlds side-by-side
  drawWinter(0);
  drawSpring(width);
  drawSummer(width * 2);
  pop();
}

/* ===========================
   SEASON DRAW FUNCTIONS
=========================== */

function drawWinter(offset) {
  push();
  translate(offset, 0);

  fill(40, 60, 90);
  rect(0, 0, width, height);

  fill(230);
  rect(0, height * 0.7, width, height * 0.3);

  for (let flake of snowflakes) {
    flake.update();
    flake.display();
  }

  pop();
}

function drawSpring(offset) {
  push();
  translate(offset, 0);

  fill(150, 200, 170);
  rect(0, 0, width, height);

  fill(100, 180, 100);
  rect(0, height * 0.7, width, height * 0.3);

  for (let petal of petals) {
    petal.update();
    petal.display();
  }

  pop();
}

function drawSummer(offset) {
  push();
  translate(offset, 0);

  fill(255, 180, 90);
  rect(0, 0, width, height);

  fill(80, 160, 80);
  rect(0, height * 0.7, width, height * 0.3);

  for (let fly of fireflies) {
    fly.update();
    fly.display();
  }

  pop();
}

/* ===========================
   PARTICLE CLASSES
=========================== */

class Snow {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(0.5, 1.5);
    this.size = random(2, 5);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    fill(255);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}

class Petal {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(0.3, 1);
    this.size = random(4, 8);
  }

  update() {
    this.y += this.speed;
    this.x += sin(frameCount * 0.01);
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }

  display() {
    fill(255, 150, 200);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size * 0.6);
  }
}

class Firefly {
  constructor() {
    this.x = random(width);
    this.y = random(height * 0.7);
    this.size = random(3, 6);
    this.offset = random(1000);
  }

  update() {
    this.y += sin(frameCount * 0.02 + this.offset) * 0.5;
  }

  display() {
    fill(255, 255, 100, 150);
    noStroke();
    circle(this.x, this.y, this.size);
  }
}
