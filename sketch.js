const r = require("raylib");
// const geometry = require("./geometry");
const d1 = require("./d1.js");
const d2 = require("./d2.js");
const vd = require("./vd.js");

const WIDTH = 1000;
const HEIGHT = 800;
const FPS = 60;
const TITLE = "scanning for particles";

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);
}

let detectorTwoX = WIDTH / 2;
const DetecorTwostart = detectorTwoX;

function running() {
  return !r.WindowShouldClose();
}

function update() {
  const detectorOneRange = WIDTH / 2;
  const detectorTwoRange = WIDTH / 2;
  const verticalDetectorRange = HEIGHT;

  d1.velocity = isInBounds(
    d1.x,
    d1.width - d1.width,
    d1.start,
    detectorOneRange - d1.width,
  )
    ? d1.velocity
    : -d1.velocity;
  d2.velocity = isInBounds(
    detectorTwoX,
    d2.width - d2.width,
    DetecorTwostart,
    detectorTwoRange - d2.width,
  )
    ? d2.velocity
    : -d2.velocity;
  vd.velocity = isInBounds(
    vd.y,
    vd.height - vd.height,
    vd.start,
    verticalDetectorRange - vd.height,
  )
    ? vd.velocity
    : -vd.velocity;

  d1.x += d1.velocity;
  detectorTwoX += d2.velocity;
  vd.y += vd.velocity;
}

function isInBounds(start1, width1, start2, width2) {
  const end1 = start1 + width1;
  const end2 = start2 + width2;

  return !(end2 < start1 || start2 > end1);
}
function getcolor(overlaped) {
  return overlaped ? r.RED : detectorColorIfNotDetected;
}
const detectorColorIfNotDetected = {
  r: 255,
  g: 255,
  b: 255,
  a: 150,
};

function draw() {
  const particle1 = { x: WIDTH / 3, y: 0, width: 70, height: HEIGHT };
  const particle2 = { x: (WIDTH / 4) * 3, y: 0, width: 100, height: HEIGHT };
  const verticalParticle = {
    x: 0,
    y: (HEIGHT / 3) * 2,
    width: WIDTH,
    height: 100,
  };

  const detector1 = { x: d1.x, y: d1.y, width: d1.width, height: HEIGHT };
  const detector2 = {
    x: detectorTwoX,
    y: d2.y,
    width: d2.width,
    height: HEIGHT,
  };
  const verticalDetector = {
    x: vd.x,
    y: vd.y,
    width: WIDTH,
    height: vd.height,
  };
  const paricleColor = r.BLUE;

  const detectorRoundness = 0.8;
  const detectorSegements = 8;

  const detectorOneDetected =
    isInBounds(particle1.x, particle1.width, d1.x, d1.width) ||
    isInBounds(particle2.x, particle2.width, d1.x, d1.width);

  const detectorTwoDtected =
    isInBounds(particle2.x, particle2.width, detectorTwoX, d2.width) ||
    isInBounds(particle1.x, particle1.width, detectorTwoX, d2.width);

  const verticalDetectorDetcted = isInBounds(
    verticalParticle.y,
    verticalParticle.height,
    vd.y,
    vd.height,
  );

  const detectorOneColor = getcolor(detectorOneDetected);
  const detectorTwoColor = getcolor(detectorTwoDtected);
  const verticalDetectorColor = getcolor(verticalDetectorDetcted);

  const blinkingSpeed = 6;

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawText("Hemanth", 10, 150, 10, r.GREEN);

  r.DrawRectangleRec(particle1, paricleColor);
  r.DrawRectangleRec(particle2, paricleColor);
  r.DrawRectangleRec(verticalParticle, paricleColor);

  if (d1.blinker !== blinkingSpeed) {
    r.DrawRectangleRounded(
      detector1,
      detectorRoundness,
      detectorSegements,
      detectorOneColor,
    );
  }

  if (d2.blinker !== blinkingSpeed) {
    r.DrawRectangleRounded(
      detector2,
      detectorRoundness,
      detectorSegements,
      detectorTwoColor,
    );
  }

  if (vd.blinker !== blinkingSpeed) {
    r.DrawRectangleRounded(
      verticalDetector,
      detectorRoundness,
      detectorSegements,
      verticalDetectorColor,
    );
  }

  if (detectorOneDetected || detectorTwoDtected || verticalDetectorDetcted) {
    r.DrawText("Warning ! ", WIDTH / 2 - 80, 5, 60, r.RED);
  }

  d1.blinker = blinkCheck(d1.blinker, detectorOneDetected, blinkingSpeed);
  d2.blinker = blinkCheck(d2.blinker, detectorTwoDtected, blinkingSpeed);
  vd.blinker = blinkCheck(vd.blinker, verticalDetectorDetcted, blinkingSpeed);
  r.EndDrawing();
}
function blinkCheck(blinker, detectorDetected, blinkingSpeed) {
  return !detectorDetected || blinker === blinkingSpeed
    ? (blinker = 0)
    : ++blinker;
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
