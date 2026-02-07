<script setup lang="ts">
import { useFractalStore } from "../store/useFractalStore";
const fractal = useFractalStore();
</script>

<template>
  <button @click="fractal.randomizeParams" class="button-primary">
    <span class="icon">🎲</span>
  </button>
</template>
