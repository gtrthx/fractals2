vec2 complexDivide(vec2 a, vec2 b) {
    float denominator = dot(b, b);
    return vec2(dot(a, b), a.y * b.x - a.x * b.y) / (denominator + 0.00001);
}

vec2 complexPower(vec2 z, float exponent) {
    float radius = length(z);
    float angle = atan(z.y, z.x);
    return pow(radius, exponent) * vec2(cos(angle * exponent), sin(angle * exponent));
}

vec2 complexMul(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}
