let cameraX = 0;
let targetX = 0;
let currentScreen = 0;
let screenWidth;

function setup() {
  createCanvas(windowWidth, windowHeight);
  screenWidth = width;
}

function draw() {
  background(240); // soft fallback background

  // Smooth, slow meditative movement
  cameraX = lerp(cameraX, targetX, 0.04);

  push();
  translate(-cameraX, 0);

  drawWinter(0);
  drawSpring(screenWidth);
  drawSummer(screenWidth * 2);

  pop();
}

function mousePressed() {
  // Click anywhere to transition
  currentScreen++;
  if (currentScreen > 2) currentScreen = 0;
  targetX = currentScreen * screenWidth;
}

/* -------- SEASONS -------- */

function drawWinter(offset) {
  push();
  translate(offset, 0);

  // Sky
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(30, 50, 100), color(200, 230, 255), inter);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
  fill(255);
  rect(0, height * 0.65, width, height);

  // Snow
  fill(255, 200);
  for (let i = 0; i < 60; i++) {
    let x = (frameCount * 0.5 + i * 120) % width;
    let y = (frameCount * 0.8 + i * 80) % height;
    ellipse(x, y, 5);
  }

  pop();
}
function drawSpring(offset) {
  push();
  translate(offset, 0);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(160, 210, 255), color(255, 210, 230), inter);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();
  fill(100, 200, 120);
  rect(0, height * 0.7, width, height);

  // Flowers
  for (let i = 0; i < 25; i++) {
    let x = i * 80 + 50;
    let sway = sin(frameCount * 0.03 + i) * 10;

    stroke(40, 120, 60);
    strokeWeight(3);
    line(x, height * 0.7, x + sway, height * 0.6);

    noStroke();
    fill(255, 120, 160);
    ellipse(x + sway, height * 0.58, 16);
  }
  pop();
}

function drawSummer(offset) {
  push();
  translate(offset, 0);

  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(255, 170, 90), color(255, 230, 140), inter);
    stroke(c);
    line(0, y, width, y);
  }

  noStroke();
  fill(80, 180, 80);
  rect(0, height * 0.75, width, height);

  // Sun pulse
  let pulse = sin(frameCount * 0.02) * 15;
  fill(255, 200, 0);
  ellipse(width - 150, 150, 140 + pulse);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screenWidth = width;
  targetX = currentScreen * screenWidth;
}
