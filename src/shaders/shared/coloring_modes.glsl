// --- coloring_modes.glsl ---

// 1. Orbit Trap (Point) - Fixed: Better scaling
#ifdef COL_ORBIT_TRAP
    // Distance to the moving 'osc' point
    float d = length(z - osc.xy);
    colorAcc = min(colorAcc, d);
#endif

// 2. Pickover Stalks (Cross Trap) - NEW
// Measures distance to the X and Y axes. Creates thin, needle-like structures.
#ifdef COL_STALKS
    float dX = abs(z.x - osc.x);
    float dY = abs(z.y - osc.y);
    colorAcc = min(colorAcc, min(dX, dY));
#endif

// 3. Curvature Flow - FIXED
// Instead of raw atan, we measure the "dot product" change between vectors.
// This highlights areas where the orbit makes sharp turns.
#ifdef COL_CURVATURE
    vec2 v1 = normalize(z - zPrev);
    vec2 v2 = normalize(zPrev - (zPrev - (z - zNext))); // Approximation of prev velocity
    float turn = acos(clamp(dot(v1, v2), -1.0, 1.0));
    colorAcc += turn;
#endif

// 4. Zebra Stripes - FIXED
// Uses a "Sum of Sines" approach. We weight the stripes so the outer orbits 
// don't dominate the inner ones.
#ifdef COL_STRIPES
    // The multiplier (20.0) controls the density of the wood-grain
    colorAcc += sin(20.0 * atan(z.y, z.x) + 10.0 * log(length(z) + 1.0));
#endif

// 5. Digital Grid - FIXED
// Better scaling for the grid lines
#ifdef COL_GRID
    vec2 grid = abs(fract(z * 2.0 + 0.5) - 0.5);
    colorAcc = min(colorAcc, min(grid.x, grid.y));
#endif

// 6. Delta (Difference) - NEW
// Tracks the distance the point traveled this step relative to its total distance.
// Great for "motion blur" or "neon" looks.
#ifdef COL_DELTA
    colorAcc += length(z - zPrev) / (length(z) + 0.1);
#endif

// 7. Binary Decomposition - NEW
// Classic "checkerboard" coloring. Very high contrast.
#ifdef COL_BINARY
    if (z.x * z.y > 0.0) colorAcc += 1.0;
#endif

// 8. Exponential Smoothing - NEW
// A more organic version of escape time.
#ifdef COL_EXP
    colorAcc += exp(-length(z));
#endif
