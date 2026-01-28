import type { FractalState } from "./fractal-state";

export interface Preset extends FractalState {
  id: string;
  name: string;
  description?: string;
}
