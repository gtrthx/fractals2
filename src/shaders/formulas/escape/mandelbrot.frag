#include "common_header"

vec2 fractalStep(vec2 z, vec2 c, vec2 p, vec2 zPrev) {
  return complexPower(z, p) + c;
}

#include "escape_engine"

void main() {
  run_escape_engine();
}
