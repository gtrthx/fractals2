// --- Basic Utils ---
float sinh(float x) {
  return (exp(x) - exp(-x)) / 2.0;
}
float cosh(float x) {
  return (exp(x) + exp(-x)) / 2.0;
}

// --- Standard Operations ---
vec2 complexMul(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 complexDiv(vec2 a, vec2 b) {
  float den = dot(b, b) + 1e-10;
  return vec2(dot(a, b), a.y * b.x - a.x * b.y) / den;
}

vec2 complexPower(vec2 z, vec2 p) {
  float r = length(z);
  if (r == 0.0) return vec2(0.0);
  float theta = atan(z.y, z.x);
  float lnR = log(r);
  float mag = exp(p.x * lnR - p.y * theta);
  float ang = p.x * theta + p.y * lnR;
  return mag * vec2(cos(ang), sin(ang));
}

// --- Trigonometric & Hyperbolic ---
vec2 complexSin(vec2 z) {
  return vec2(sin(z.x) * cosh(z.y), cos(z.x) * sinh(z.y));
}

vec2 complexCos(vec2 z) {
  return vec2(cos(z.x) * cosh(z.y), -sin(z.x) * sinh(z.y));
}

vec2 complexTan(vec2 z) {
  // tan(z) = sin(z)/cos(z)
  return complexDiv(complexSin(z), complexCos(z));
}

vec2 complexSinh(vec2 z) {
  // sinh(x + iy) = sinh(x)cos(y) + i cosh(x)sin(y)
  return vec2(sinh(z.x) * cos(z.y), cosh(z.x) * sin(z.y));
}

vec2 complexCosh(vec2 z) {
  // cosh(x + iy) = cosh(x)cos(y) + i sinh(x)sin(y)
  return vec2(cosh(z.x) * cos(z.y), sinh(z.x) * sin(z.y));
}

vec2 complexTanh(vec2 z) {
  // tanh(z) = sinh(z) / cosh(z)
  return complexDiv(complexSinh(z), complexCosh(z));
}

// --- Logarithm & Exponential ---
vec2 complexExp(vec2 z) {
  // e^(x+iy) = e^x * (cos(y) + i sin(y))
  return exp(z.x) * vec2(cos(z.y), sin(z.y));
}

vec2 complexLog(vec2 z) {
  // ln(z) = ln(|z|) + i*arg(z)
  return vec2(log(length(z) + 1e-10), atan(z.y, z.x));
}

vec2 complexSqrt(vec2 z) {
  float r = length(z);
  float ang = atan(z.y, z.x);
  return sqrt(r) * vec2(cos(ang * 0.5), sin(ang * 0.5));
}
