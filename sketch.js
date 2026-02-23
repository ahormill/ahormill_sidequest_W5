let cameraX = 0;
let targetX = 0;
let screenWidth;
let currentScreen = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  screenWidth = width;

  let button = select("#nextButton");
  button.mousePressed(moveForward);
}

function draw() {
  background(0);

  // Smooth camera movement (meditative easing)
  cameraX = lerp(cameraX, targetX, 0.05);

  push();
  translate(-cameraX, 0);
  drawWinter(0);
  drawSpring(screenWidth);
  drawSummer(screenWidth * 2);

  pop();
}

function moveForward() {
  currentScreen++;
  if (currentScreen > 2) {
    currentScreen = 0;
  }
  targetX = currentScreen * screenWidth;
}

/* ---------------- SEASONS ---------------- */

function drawWinter(offset) {
  push();
  translate(offset, 0);

  // Sky
  backgroundGradient(color(20, 30, 60), color(180, 220, 255));

  // Snow ground
  fill(240);
  rect(0, height * 0.65, width, height);

  // Falling snow
  for (let i = 0; i < 50; i++) {
    fill(255, 200);
    let x = (frameCount * 0.5 + i * 100) % width;
    let y = (frameCount * 0.8 + i * 50) % height;
    ellipse(x, y, 4);
  }

  pop();
}

function drawSpring(offset) {
  push();
  translate(offset, 0);

  backgroundGradient(color(150, 200, 255), color(255, 200, 230));

  // Grass
  fill(100, 200, 100);
  rect(0, height * 0.7, width, height);

  // Flowers gently swaying
  for (let i = 0; i < 20; i++) {
    let x = i * 80 + 40;
    let sway = sin(frameCount * 0.03 + i) * 10;
    stroke(0, 100, 0);
    line(x, height * 0.7, x + sway, height * 0.6);

    noStroke();
    fill(255, 100, 150);
    ellipse(x + sway, height * 0.58, 15);
  }

  pop();
}

function drawSummer(offset) {
  push();
  translate(offset, 0);

  backgroundGradient(color(255, 180, 100), color(255, 220, 120));

  // Ground
  fill(80, 180, 80);
  rect(0, height * 0.75, width, height);

  // Sun pulsing slowly
  let pulse = sin(frameCount * 0.02) * 10;
  fill(255, 200, 0);
  ellipse(width - 150, 150, 120 + pulse);

  pop();
}

/* ---------- HELPER ---------- */

function backgroundGradient(c1, c2) {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screenWidth = width;
  targetX = currentScreen * screenWidth;
}
