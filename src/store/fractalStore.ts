import { defineStore } from "pinia";
import gsap from "gsap";

export const useFractalStore = defineStore("fractal", {
  state: () => ({
    zoom: 2.0,
    params: {
      relaxation: 0.3,
      powerMain: 3.0,
      powerDerivative: 2.0,
      subtrahend: 1.0,
      maxIterations: 80,
      seedX: 1.0,
      seedY: 0.0,
      juliaMorph: 0.0,
    },
    isJulia: false,
    offsetShiftX: 0.0,
    offsetShiftY: 0.0,
    liveParams: {} as Record<string, number>,
    time: 0,
    mouseX: 0, // The "Target" (where the mouse actually is)
    mouseY: 0,
    smoothedX: 0, // The "Current" (the value that follows with a delay)
    smoothedY: 0,
    activeTargetAxis: null as "x" | "y" | null,
    bindingsX: [] as string[],
    bindingsY: [] as string[],
    isPaused: false,
    frozenValues: {} as Record<string, number>,
    isUiVisible: true,
  }),
  actions: {
    togglePause() {
      this.isPaused = !this.isPaused;
    },
    toggleUi() {
      this.isUiVisible = !this.isUiVisible;
      if (!this.isUiVisible) {
        this.activeTargetAxis = null; // Clean up selection mode when hiding UI
      }
    },
    toggleTargetAxis(axis: "x" | "y") {
      this.activeTargetAxis = this.activeTargetAxis === axis ? null : axis;
    },
    bindVariable(varName: string) {
      if (!this.activeTargetAxis) return;

      this.bindingsX = this.bindingsX.filter((v) => v !== varName);
      this.bindingsY = this.bindingsY.filter((v) => v !== varName);

      if (this.activeTargetAxis === "x") this.bindingsX.push(varName);
      if (this.activeTargetAxis === "y") this.bindingsY.push(varName);
    },

    unbindVariable(varName: string, axis: "x" | "y") {
      if (axis === "x")
        this.bindingsX = this.bindingsX.filter((v) => v !== varName);
      if (axis === "y")
        this.bindingsY = this.bindingsY.filter((v) => v !== varName);
    },

    resetView() {
      gsap.to(this, {
        zoom: 2.0,
        offsetShiftX: 0,
        offsetShiftY: 0,
        duration: 1.5,
        ease: "expo.inOut",
      });
    },
    smoothZoom(delta: number) {
      const zoomSpeed = 0.2;
      const factor = delta > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      const newZoom = this.zoom * factor;

      // 1. Correct Delta Math
      // The amount of shift needed is relative to the scale change
      const dx = this.mouseX * (this.zoom - newZoom);
      const dy = this.mouseY * (this.zoom - newZoom);

      // 2. Correct Property Names (matching your state keys)
      gsap.to(this, {
        zoom: newZoom,
        offsetShiftX: this.offsetShiftX + dx,
        offsetShiftY: this.offsetShiftY + dy,
        duration: 0.4,
        ease: "power2.out",
      });
    },
  },
});
