import type { SliderSchema } from "./slider-schema";

export interface ControlGroup {
  label: string;
  colorKey: string;
  sliders: SliderSchema[];
}
