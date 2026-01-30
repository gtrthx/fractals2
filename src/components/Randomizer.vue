<template>
  <button @click="fractalStore.randomizeParams" class="random-btn">
    <span class="icon">🎲</span>
  </button>
</template>

<script setup lang="ts">
import { useFractalStore } from "../store/fractalStore";
const fractalStore = useFractalStore();
</script>

<style scoped>
.random-btn {
  margin-top: 10px;
  background: #1a1a1a;
  color: #646cff;
  border: 1px solid #646cff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.random-btn:hover {
  background: #646cff;
  color: white;
  box-shadow: 0 0 15px rgba(100, 108, 255, 0.4);
}

.random-btn:active {
  transform: scale(0.95);
}
</style>
