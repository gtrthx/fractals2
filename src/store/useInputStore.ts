import { defineStore } from "pinia";
import type { FractalParams } from "../types/fractal";

export const useInputStore = defineStore("interaction", {
  state: () => ({
    mouse: {
      x: 0,
      y: 0,
      inputX: 0,
      inputY: 0,
      smoothedX: 0,
      smoothedY: 0,
    },
    activeAxis: null as "x" | "y" | null,
    bindings: {
      x: ["seedX"] as (keyof FractalParams)[],
      y: ["seedY"] as (keyof FractalParams)[],
    },
    isPaused: false,
  }),

  actions: {
    updateMouse(x: number, y: number) {
      this.mouse.x = x;
      this.mouse.y = y;

      if (!this.isPaused) {
        this.mouse.inputX = x;
        this.mouse.inputY = y;
      }
    },

    tickSmoothing() {
      this.mouse.smoothedX += (this.mouse.inputX - this.mouse.smoothedX) * 0.08;
      this.mouse.smoothedY += (this.mouse.inputY - this.mouse.smoothedY) * 0.08;
    },

    toggleTargetAxis(axis: "x" | "y") {
      this.activeAxis = this.activeAxis === axis ? null : axis;
    },

    bindVariable(paramKey: keyof FractalParams) {
      if (!this.activeAxis) return;

      this.unbindVariable(paramKey, "x");
      this.unbindVariable(paramKey, "y");

      this.bindings[this.activeAxis].push(paramKey);
    },

    unbindVariable(paramKey: keyof FractalParams, axis: "x" | "y") {
      this.bindings[axis] = this.bindings[axis].filter(
        (v) => v !== paramKey,
      ) as (keyof FractalParams)[];
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
