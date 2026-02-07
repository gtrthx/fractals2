<script setup lang="ts">
import { ref } from "vue";
import { useFractalEngine } from "./composables/useFractalEngine";
import { useMouseInteraction } from "./composables/useMouseInteraction";
import FractalUI from "./components/FractalUI.vue";
import { useKeyboardShortcuts } from "./composables/useKeyboardShortcuts";
import { useInputStore } from "./store/useInputStore";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const inputStore = useInputStore();

const engine = useFractalEngine(canvasRef);
useKeyboardShortcuts();
useMouseInteraction(canvasRef);
const handleRecordRequest = () => {
  // We call it here, and we can pass the 15-second default
  engine.startRecording(15);
};
</script>

<template>
  <div
    class="app-container"
    :class="{
      'selecting-x': inputStore.activeAxis === 'x',
      'selecting-y': inputStore.activeAxis === 'y',
    }"
  >
    <FractalUI @trigger-record="handleRecordRequest" />
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss">
.app-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #050505;
  overflow: hidden;
}

.app-container.selecting-x,
.app-container.selecting-y {
  cursor: crosshair !important;
}

.app-container.selecting-x #formula-display,
.app-container.selecting-y #formula-display {
  background: rgba(100, 108, 255, 0.05);
  box-shadow: 0 0 20px rgba(100, 108, 255, 0.2);
  border-radius: 8px;
}

.ui-panel {
  width: 350px;
  height: 100%;
  background: rgba(15, 15, 15, 0.9);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 20px;
  z-index: 10;
  color: white;
}

canvas {
  // flex-grow: 1;
  height: 100%;
  margin: 0px auto;
  position: relative;
  left: 50px;
}

hr {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 20px 0;
}
</style>
