<script setup lang="ts">
import { computed } from "vue";
import { useMemoryStore } from "../../store/useMemoryStore";
import BaseDropdown from "../ui/BaseDropdown.vue";

const memory = useMemoryStore();

// This is much more stable than doing it in-line
const activeLabel = computed(() => {
  return (
    memory.modes.find((m) => m.value === memory.currentMode)?.label || "None"
  );
});
</script>

<template>
  <BaseDropdown
    label="Memory Operator"
    v-model="memory.currentMode"
    :options="memory.modes"
    identityKey="value"
    :displayValue="activeLabel"
  />
</template>
