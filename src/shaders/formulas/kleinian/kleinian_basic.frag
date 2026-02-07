#include "common_header"

vec2 fractalStep(vec2 z, vec2 c, vec2 p, vec2 zPrev) {
  float r2 = dot(z, z);
  return z / r2 + c;
}

#include "kleinian_engine"

void main() {
  run_kleinian_engine();
}
