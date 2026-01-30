export const DEFAULT_SLIDER_CONSTRAINTS: Record<
  string,
  { min: number; max: number; step: number }
> = {
  power: { min: -10, max: 10, step: 0.01 },
  powerI: { min: -10, max: 10, step: 0.01 },
  juliaMorph: { min: 0, max: 1.0, step: 0.01 },
  seedX: { min: -2, max: 2, step: 0.01 },
  seedY: { min: -2, max: 2, step: 0.01 },
  memoryR: { min: -1, max: 1, step: 0.01 },
  memoryI: { min: -1, max: 1, step: 0.01 },
  maxIterations: { min: 1, max: 1000, step: 1 },
  relaxation: { min: -2, max: 2, step: 0.01 },
  relaxationI: { min: -2, max: 2, step: 0.01 },
  subtrahend: { min: -2, max: 2, step: 0.01 },
  subtrahendI: { min: -2, max: 2, step: 0.01 },
};
