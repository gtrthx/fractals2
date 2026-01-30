import { defineStore } from "pinia";
import type { BaseFractalParams } from "../types/base-fractal-params";

export const useInteractionStore = defineStore("interaction", {
  state: () => ({
    mouse: {
      x: 0,
      y: 0,
      boundX: 0,
      boundY: 0,
      smoothedX: 0,
      smoothedY: 0,
    },
    activeAxis: null as "x" | "y" | null,
    bindings: {
      x: ["seedX"] as (keyof BaseFractalParams)[],
      y: ["seedY"] as (keyof BaseFractalParams)[],
    },
    isPaused: false,
  }),

  actions: {
    updateMouse(x: number, y: number) {
      this.mouse.x = x;
      this.mouse.y = y;

      if (!this.isPaused) {
        this.mouse.boundX = x;
        this.mouse.boundY = y;
      }
    },

    tickSmoothing() {
      this.mouse.smoothedX += (this.mouse.boundX - this.mouse.smoothedX) * 0.08;
      this.mouse.smoothedY += (this.mouse.boundY - this.mouse.smoothedY) * 0.08;
    },

    toggleTargetAxis(axis: "x" | "y") {
      this.activeAxis = this.activeAxis === axis ? null : axis;
    },

    bindVariable(varName: keyof BaseFractalParams) {
      if (!this.activeAxis) return;

      // Clean up existing bindings for this variable on either axis
      this.unbindVariable(varName, "x");
      this.unbindVariable(varName, "y");

      this.bindings[this.activeAxis].push(varName);
    },

    unbindVariable(varName: string, axis: "x" | "y") {
      this.bindings[axis] = this.bindings[axis].filter(
        (v) => v !== varName,
      ) as (keyof BaseFractalParams)[];
    },

    unbindAll() {
      this.bindings.x = [];
      this.bindings.y = [];
    },
    togglePause() {
      this.isPaused = !this.isPaused;
    },
  },
});
