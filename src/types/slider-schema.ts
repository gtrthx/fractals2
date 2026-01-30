import type { BaseFractalParams } from "./base-fractal-params";

export interface SliderSchema {
  varName: keyof BaseFractalParams;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  showPlus?: boolean;
}
