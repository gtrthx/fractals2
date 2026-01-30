import type { ControlGroup } from "../../types/control-group";

export const BASE_CONTROL_GROUPS: Record<string, ControlGroup[]> = {
  escape: [
    {
      label: "Power (P)",
      colorKey: "power",
      sliders: [
        { varName: "power" },
        { varName: "powerI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Julia Morph",
      colorKey: "morph",
      sliders: [{ varName: "juliaMorph" }],
    },
    {
      label: "Seed Offset",
      colorKey: "seed",
      sliders: [
        { varName: "seedX" },
        { varName: "seedY", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Memory (zₙ₋₁)",
      colorKey: "memory",
      sliders: [
        { varName: "memoryR" },
        { varName: "memoryI", suffix: "i", showPlus: true },
      ],
    },
  ],
  newton: [
    {
      label: "Relaxation (a)",
      colorKey: "relaxation",
      sliders: [
        { varName: "relaxation" },
        { varName: "relaxationI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Memory (zₙ₋₁)",
      colorKey: "memory",
      sliders: [
        { varName: "memoryR" },
        { varName: "memoryI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Subtrahend",
      colorKey: "subtrahend",
      sliders: [
        { varName: "subtrahend" },
        { varName: "subtrahendI", suffix: "i", showPlus: true },
      ],
    },
  ],
};
