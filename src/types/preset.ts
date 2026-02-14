import type { ColoringMode, Palette } from "./coloring";
import type { FormulaId, FractalType } from "./fractal";
import type {
  LFOConfig,
  ModifiedParameter,
  ModifierConfig,
  ParameterUnitId,
  ParameterValues,
} from "./parameter";

export interface Preset {
  id: string;
  label: string; // Preset's name in the UI
  fractalType: FractalType;
  formulaId: FormulaId; // Which mathematical base is used
  parameterValues: ParameterValues;
  modifiers: Record<ModifiedParameter, ModifierConfig>;
  lfos: Partial<Record<ParameterUnitId, LFOConfig[]>>;

  // Visual/Environment properties
  coloringMode: ColoringMode;
  palette: Palette;
  sensitivity: number; // How much parameters change with mouse movement / slider drag / randomization
  maxIterations: number; // How much iterations are calculated for every pixel
  cameraZoom: number;
  cameraOffset: { x: number; y: number };
}
