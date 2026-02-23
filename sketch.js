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
  // Smooth meditative easing
  cameraX = lerp(cameraX, targetX, 0.03);

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

  drawGradient(color(20, 30, 70), color(180, 220, 255));

  // Snow ground
  fill(245);
  noStroke();
  rect(0, height * 0.65, width, height);

  // Snowfall
  for (let i = 0; i < 60; i++) {
    fill(255, 220);
    let x = (frameCount * 0.4 + i * 150) % width;
    let y = (frameCount * 0.8 + i * 60) % height;
    ellipse(x, y, 5);
  }

  pop();
}

function drawSpring(offset) {
  push();
  translate(offset, 0);

  drawGradient(color(160, 210, 255), color(255, 210, 230));

  fill(100, 200, 120);
  noStroke();
  rect(0, height * 0.7, width, height);

  // Flowers swaying
  for (let i = 0; i < 25; i++) {
    let x = i * 80 + 50;
    let sway = sin(frameCount * 0.03 + i) * 12;

    stroke(40, 120, 60);
    strokeWeight(3);
    line(x, height * 0.7, x + sway, height * 0.6);

    noStroke();
    fill(255, 120, 160);
    ellipse(x + sway, height * 0.58, 18);
  }

  pop();
}

function drawSummer(offset) {
  push();
  translate(offset, 0);

  drawGradient(color(255, 170, 90), color(255, 230, 140));
  fill(80, 180, 80);
  noStroke();
  rect(0, height * 0.75, width, height);

  // Pulsing sun
  let pulse = sin(frameCount * 0.02) * 15;
  fill(255, 200, 0);
  ellipse(width - 160, 160, 140 + pulse);

  pop();
}

/* ---------- GRADIENT FUNCTION ---------- */

function drawGradient(c1, c2) {
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
