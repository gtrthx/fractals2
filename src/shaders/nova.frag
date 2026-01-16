precision highp float;

#include "./shared/complex_math.glsl"

uniform vec2 resolution;
uniform float zoom;
uniform float relaxation;
uniform float powerMain;
uniform float powerDerivative;
uniform float maxIterations;
uniform float subtrahend;
uniform float offsetShiftX;
uniform float offsetShiftY;
uniform float seedX;
uniform float seedY;
uniform float juliaMorph;
uniform float time; // For subtle color animation
// uniform bool isJulia;

// The core Nova math logic moved to a function for the AA loop
vec3 get_nova_color(vec2 uv) {
    // Current pixel coordinate on the complex plane
    vec2 coord = (uv * zoom) + vec2(offsetShiftX, offsetShiftY);
    vec2 seed = vec2(seedX, seedY);
    // Initial Z: Mandel starts at Seed, Julia starts at Coord
    vec2 zStart = mix(seed, coord, juliaMorph);
    
    // Constant C: Mandel uses Coord, Julia uses Seed
    vec2 cConstant = mix(coord, seed, juliaMorph);

    vec2 currentZ = zStart;
    vec2 constantOffset = cConstant;

    float iterations = 0.0;
    float minDiff = 1000.0;

    for (float i = 0.0; i < 80.0; i++) {
        vec2 previousZ = currentZ;

        if (i >= maxIterations) break;
        // Nova Logic: z = z - R * f(z)/f'(z) + c
        vec2 functionValue = complexPower(currentZ, powerMain) - vec2(subtrahend, 0.0); 
        vec2 derivativeValue = complexPower(currentZ, powerDerivative);
        
        vec2 newtonStep = complexDivide(functionValue, derivativeValue);
        currentZ = currentZ - (relaxation * newtonStep) + constantOffset;

        float diff = length(currentZ - previousZ);
        minDiff = min(minDiff, diff);

        if (diff < 0.0001) break;
        iterations++;
    }

    if (iterations >= maxIterations - 1.0) return vec3(0.02); // Dark inside for "unconverged" points

    // --- NOVA SMOOTHING ---
    // Instead of Phoenix's log-log, we use a distance-based weight
    // This removes the "steps" between iteration counts.
    float smoothIter = iterations - log2(log2(minDiff * 10000.0 + 1.0) + 1.0);
    float f = smoothIter / maxIterations;

    // --- PHOENIX-STYLE PALETTE ---
    // Reusing the color frequencies from your Phoenix shader
    // (f + time * 0.1) creates that slow, elegant shifting
    vec3 col = 0.5 + 0.5 * cos(6.28318 * (vec3(f + time * 0.05) + vec3(0.0, 0.1, 0.2)));
    
    // Apply a soft vignette/brightness falloff based on depth
    return col * pow(1.0 - f, 0.5);
}

void main() {
    vec3 finalCol = vec3(0.0);
    
    // --- 2x2 SUPERSAMPLING (From your Phoenix code) ---
    // This samples 4 times per pixel and averages the result
    for (int m = 0; m < 2; m++) {
        for (int n = 0; n < 2; n++) {
            vec2 offset = vec2(float(m), float(n)) / 2.0 - 0.5;
            vec2 uv = (gl_FragCoord.xy + offset - 0.5 * resolution.xy) / min(resolution.y, resolution.x);
            
            finalCol += get_nova_color(uv);
        }
    }
    
    gl_FragColor = vec4(finalCol / 4.0, 1.0);
}
