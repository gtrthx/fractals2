import { defineStore } from "pinia";
import { ref } from "vue";
import type { MemoryMode } from "../types/fractal";

export const useMemoryStore = defineStore("memory", () => {
  const modes: { label: string; value: MemoryMode }[] = [
    { label: "None", value: "NONE" },
    { label: "Absolute (Z)", value: "ABS_BOTH" },
    { label: "Absolute Real", value: "ABS_X" },
    { label: "Absolute Imaginary", value: "ABS_Y" },
    { label: "Conjugate", value: "CONJUGATE" },
    { label: "Reverse", value: "REVERSE" },
    { label: "Invert", value: "INVERT" },
    { label: "Sin", value: "SIN" },
    { label: "Cos", value: "COS" },
    { label: "Tan", value: "TAN" },
    { label: "Exponential", value: "EXP" },
    { label: "Reciprocal", value: "RECIPROCAL" },
    { label: "Cubic Memory", value: "POW3" },
    { label: "Fold", value: "FOLD" },
    { label: "Swizzle", value: "SWIZZLE" },
  ];

  const currentMode = ref<MemoryMode>("NONE");

  const nextOperator = () => {
    const index = modes.findIndex((m) => m.value === currentMode.value);
    currentMode.value = modes[(index + 1) % modes.length].value;
  };

  const prevOperator = () => {
    const index = modes.findIndex((m) => m.value === currentMode.value);
    currentMode.value = modes[(index - 1 + modes.length) % modes.length].value;
  };

  return { modes, currentMode, nextOperator, prevOperator };
});
