<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useFractalStore } from "../../store/useFractalStore";
import type { ColoringMode } from "../../types/fractal";

const fractalStore = useFractalStore();

const modes: { label: string; value: ColoringMode }[] = [
  { label: "Default", value: "DEFAULT" },
  { label: "Orbit Trap", value: "ORBIT_TRAP" },
  { label: "Stalks", value: "STALKS" },
  { label: "Curvature", value: "CURVATURE" },
  { label: "Stripes", value: "STRIPES" },
  { label: "Grid", value: "GRID" },
  { label: "Delta", value: "DELTA" },
  { label: "Binary", value: "BINARY" },
  { label: "Exp", value: "EXP" },
];

const handleModeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  fractalStore.coloringMode = target.value as ColoringMode;
};

const nextColorMode = () => {
  const currentIndex = modes.findIndex(
    (m) => m.value === fractalStore.coloringMode,
  );
  const nextIndex = (currentIndex + 1) % modes.length;
  fractalStore.coloringMode = modes[nextIndex].value;
};

const prevColorMode = () => {
  const currentIndex = modes.findIndex(
    (m) => m.value === fractalStore.coloringMode,
  );
  const prevIndex = (currentIndex - 1 + modes.length) % modes.length;
  fractalStore.coloringMode = modes[prevIndex].value;
};

onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "}") nextColorMode();
    if (e.key === "{") prevColorMode();
  };

  window.addEventListener("keydown", handleKeyDown);
  onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
});
</script>

<template>
  <div class="control-group">
    <label class="control-label">Coloring Mode</label>
    <select
      :value="fractalStore.coloringMode"
      @change="handleModeChange"
      class="mode-dropdown"
    >
      <option v-for="mode in modes" :key="mode.value" :value="mode.value">
        {{ mode.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped>
.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px 0;
  border-radius: 4px;
}

.control-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #888;
  letter-spacing: 0.05em;
}

.mode-dropdown {
  background: #1a1a1a;
  color: #eee;
  border: 1px solid #333;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}

.mode-dropdown:hover {
  border-color: #646cff;
}
</style>
