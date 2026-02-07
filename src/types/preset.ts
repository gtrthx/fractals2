import type {
  ColoringMode,
  FractalParams,
  FractalType,
  MemoryMode,
} from "./fractal";
import type { Palette, PointerBindings } from "./ui";

export interface Preset {
  label: string;
  fractalType: FractalType;
  formulaId: string;
  memoryMode: MemoryMode;
  coloringMode: ColoringMode;
  fractalParams: FractalParams;
  bindings: PointerBindings;
  intensity: number;
  zoom: number;
  offset: { x: number; y: number };
  palette: Palette;
}
