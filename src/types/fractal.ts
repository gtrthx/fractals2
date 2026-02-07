export type FractalType = "escape" | "newton" | "nova" | "kleinian";

export interface FractalParams {
  maxIterations: number;
  power: number;
  powerI: number;
  seedR: number;
  seedI: number;
  juliaMorph: number;
  // hybridMorph: number;
  memoryR: number;
  memoryI: number;
  subtrahend: number;
  subtrahendI: number;
  relaxation: number;
  relaxationI: number;
  powerSecondary: number;
  powerSecondaryI: number;
  kleinianBox: number;
  kleinianSphere: number;
}

export type MemoryMode =
  | "NONE"
  | "ABS_BOTH"
  | "ABS_X"
  | "ABS_Y"
  | "CONJUGATE"
  | "REVERSE"
  | "INVERT"
  | "SIN"
  | "COS"
  | "TAN"
  | "EXP"
  | "RECIPROCAL"
  | "POW3"
  | "FOLD"
  | "SWIZZLE";

export type ColoringMode =
  | "DEFAULT"
  | "ORBIT_TRAP"
  | "CURVATURE"
  | "STRIPES"
  | "GRID"
  | "DELTA"
  | "STALKS"
  | "BINARY"
  | "EXP";
