import type { ControlGroup } from "../../types/ui";

export const BASE_CONTROL_GROUPS: Record<string, ControlGroup[]> = {
  escape: [
    {
      label: "Power (P)",
      colorKey: "power",
      sliders: [
        { paramKey: "power" },
        { paramKey: "powerI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Julia Morph",
      colorKey: "morph",
      sliders: [{ paramKey: "juliaMorph" }],
    },
    {
      label: "Seed Offset",
      colorKey: "seed",
      sliders: [
        { paramKey: "seedX" },
        { paramKey: "seedY", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Memory (zₙ₋₁)",
      colorKey: "memory",
      sliders: [
        { paramKey: "memoryR" },
        { paramKey: "memoryI", suffix: "i", showPlus: true },
      ],
    },
  ],
  newton: [
    {
      label: "Relaxation (a)",
      colorKey: "relaxation",
      sliders: [
        { paramKey: "relaxation" },
        { paramKey: "relaxationI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Memory (zₙ₋₁)",
      colorKey: "memory",
      sliders: [
        { paramKey: "memoryR" },
        { paramKey: "memoryI", suffix: "i", showPlus: true },
      ],
    },
    {
      label: "Subtrahend",
      colorKey: "subtrahend",
      sliders: [
        { paramKey: "subtrahend" },
        { paramKey: "subtrahendI", suffix: "i", showPlus: true },
      ],
    },
  ],
};
