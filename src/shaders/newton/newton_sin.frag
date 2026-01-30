#include "common_header"

vec2 fractalStep(vec2 z, vec2 c, vec2 p, vec2 zPrev, float i) {
  // The previous version used: z = z - a * tan(z)
  // Here 'p.x' is 'a'. We return -a * tan(z)
  return -complexMul(vec2(p.x, 0.0), complexTan(z)) - c;
}
#include "newton_engine"

void main() {
  run_newton_engine();
}
