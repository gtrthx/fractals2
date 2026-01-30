import type { ParamRange } from "../types/param-range";

export const PARAM_CONFIGS: Record<string, ParamRange> = {
  relaxation: { min: -2.0, max: 2.0 },
  power: { min: -10.0, max: 10.0 },
  maxIterations: { min: 1, max: 500 },
  juliaMorph: { min: 0.0, max: 1.0 },
};
