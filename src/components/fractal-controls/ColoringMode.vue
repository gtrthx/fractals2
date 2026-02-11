<script setup lang="ts">
import { useColoringStore } from "../../store/useColoringStore";
import BaseDropdown from "../ui/BaseDropdown.vue";

const coloring = useColoringStore();
</script>

<template>
  <BaseDropdown
    label="Coloring Mode"
    v-model="coloring.currentMode"
    :options="coloring.modes"
    identityKey="value"
    :displayValue="
      coloring.modes.find((c) => c.value === coloring.currentMode)?.label
    "
  />
</template>
