const sketch = require("./sketch.js");

function loop() {
  while (sketch.running()) {
    sketch.update();
    sketch.draw();
  }
}

function main() {
  sketch.setup();
  loop();
  sketch.teardown();
}

main();
