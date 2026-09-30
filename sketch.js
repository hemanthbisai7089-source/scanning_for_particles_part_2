const r = require("raylib");
// const geometry = require("./geometry");
const d1 = require("./d1.js");
const d2 = require("./d2.js");
const vd = require("./vd.js");

const WIDTH = 700;
const HEIGHT = 400;
const FPS = 60;
const TITLE = "scanning for particles";

function setup() {
  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(WIDTH, HEIGHT, TITLE);
  r.SetTargetFPS(FPS);
}

let detectorTwoX = WIDTH / 2;

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
    d2.start,
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
  return overlaped ? r.Fade(r.RED, 0.7) : r.WHITE;
}

function draw() {
  const particle1 = { x: 100, y: 0, width: 50, height: HEIGHT };
  const particle2 = { x: 400, y: 0, width: 80, height: HEIGHT };
  const verticalParticle = { x: 0, y: 200, width: WIDTH, height: 70 };

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

  const color = r.BLUE;

  const detectorOneColor = getcolor(
    isInBounds(particle1.x, particle1.width, d1.x, d1.width) ||
      isInBounds(particle2.x, particle2.width, d1.x, d1.width),
  );
  const detectorTwoColor = getcolor(
    isInBounds(particle2.x, particle2.width, detectorTwoX, d2.width) ||
      isInBounds(particle1.x, particle1.width, detectorTwoX, d2.width),
  );
  const verticalDetectorColor = getcolor(
    isInBounds(verticalParticle.y, verticalParticle.height, vd.y, vd.height),
  );

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawText("Hemanth", 10, 150, 10, r.GREEN);

  r.DrawRectangleRec(particle1, color);
  r.DrawRectangleRec(particle2, color);
  r.DrawRectangleRec(verticalParticle, color);

  r.DrawRectangleRec(detector1, detectorOneColor);
  r.DrawRectangleRec(detector2, detectorTwoColor);
  r.DrawRectangleRec(verticalDetector, verticalDetectorColor);

  r.EndDrawing();
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
