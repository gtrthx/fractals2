import type { FractalType } from "./fractal-type";

export interface FractalState {
  type: FractalType;
  zoom: number;
  offsetX: number;
  offsetY: number;
  params: Record<string, number>;
  palette: {
    brightness: [number, number, number];
    contrast: [number, number, number];
    osc: [number, number, number];
    phase: [number, number, number];
  };
}
