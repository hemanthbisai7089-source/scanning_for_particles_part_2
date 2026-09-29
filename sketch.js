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
  const detectorOneRange = r.GetScreenWidth() / 2;
  const detectorTwoRange = r.GetScreenWidth() / 2;
  const verticalDetectorRange = r.GetScreenHeight();

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
  const particle1X = 100;
  const particle1Y = 0;
  const particle1Width = 50;

  const particle2X = 400;
  const particle2Y = 0;
  const particle2Width = 100;

  const verticalParticleX = 0;
  const verticalParticleY = 90;
  const verticalParticleHeight = 50;

  const detectorOneColor = getcolor(
    isInBounds(particle1X, particle1Width, d1.x, d1.width) ||
      isInBounds(particle2X, particle2Width, d1.x, d1.width),
  );
  const detectorTwoColor = getcolor(
    isInBounds(particle2X, particle2Width, detectorTwoX, d2.width) ||
      isInBounds(particle1X, particle1Width, detectorTwoX, d2.width),
  );
  const verticalDetectorColor = getcolor(
    isInBounds(verticalParticleY, verticalParticleHeight, vd.y, vd.height),
  );

  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  r.DrawText("Hemanth", 10, 150, 10, r.GREEN);

  r.DrawRectangle(
    particle2X,
    particle2Y,
    particle2Width,
    r.GetScreenHeight(),
    r.BLUE,
  );
  r.DrawRectangle(
    particle1X,
    particle1Y,
    particle1Width,
    r.GetScreenHeight(),
    r.BLUE,
  );
  r.DrawRectangle(
    verticalParticleX,
    verticalParticleY,
    r.GetScreenWidth(),
    verticalParticleHeight,
    r.BLUE,
  );

  r.DrawRectangle(d1.x, d1.y, d1.width, r.GetScreenHeight(), detectorOneColor);
  r.DrawRectangle(
    detectorTwoX,
    d2.y,
    d2.width,
    r.GetScreenHeight(),
    detectorTwoColor,
  );
  r.DrawRectangle(
    vd.x,
    vd.y,
    r.GetScreenWidth(),
    vd.height,
    verticalDetectorColor,
  );

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
