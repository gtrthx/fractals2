<script setup lang="ts">
import { computed } from "vue";
import BaseDropdown from "./ui/BaseDropdown.vue";

import { useFractalEngine } from "../composables/useFractalEngine";
import { useFractalStore } from "../store/useFractalStore";
import { useGraphicsStore } from "../store/useGraphicsStore";
import type { QualityLevel } from "../types/engine";

const graphics = useGraphicsStore();
const fractal = useFractalStore();
const fractalEngine = useFractalEngine();
const qualityLevels: QualityLevel[] = ["low", "medium", "high", "ultra"];

const resolutionOptions = computed(() => {
  return Object.entries(graphics.RESOLUTION_MODES).map(([id, res]) => ({
    id,
    label: res.label,
  }));
});

const activeLabel = computed(() => {
  return (
    graphics.RESOLUTION_MODES[graphics.resolutionPreset]?.label ||
    "Select Resolution"
  );
});

const handleSelect = (option: { id: string }) => {
  graphics.resolutionPreset = option.id as any;
};
</script>

<template>
  <div class="graphics-settings-panel">
    <div class="settings-section">
      <label class="settings-label">Render Quality</label>
      <div class="quality-tabs">
        <button
          v-for="level in qualityLevels"
          :key="level"
          @click="graphics.setQuality(level)"
          class="quality-tab-btn"
          :class="{ active: graphics.qualityLevel === level }"
        >
          {{ level }}
        </button>
      </div>
    </div>

    <div class="settings-section">
      <BaseDropdown
        label="Resolution"
        :model-value="graphics.resolutionPreset"
        :options="resolutionOptions"
        identity-key="id"
        :display-value="activeLabel"
        @select="handleSelect"
      />
    </div>

    <div class="settings-section">
      <div class="slider-header">
        <label class="settings-label">Pixel Density</label>
        <span class="value-display"
          >{{ graphics.resolutionScale.toFixed(2) }}x</span
        >
      </div>
      <input
        type="range"
        min="0.2"
        max="1.0"
        step="0.1"
        v-model.number="graphics.resolutionScale"
        @input="graphics.markCustom()"
        class="custom-slider"
      />
    </div>

    <div class="settings-section">
      <div class="slider-header">
        <label class="settings-label">Max Iterations</label>
        <span class="value-display">{{ fractal.maxIterations }}</span>
      </div>
      <input
        type="range"
        min="20"
        max="500"
        step="10"
        v-model.number="fractal.maxIterations"
        @input="graphics.markCustom()"
        class="custom-slider"
      />
    </div>

    <div class="settings-section advanced-options">
      <div class="toggle-row">
        <div class="toggle-info">
          <h4 class="option-title">Supersampling</h4>
          <p class="option-desc">
            Renders at 4x internal resolution for edge smoothing.
          </p>
        </div>
        <div
          class="toggle-track"
          :class="{ on: graphics.useSSAA }"
          @click="graphics.toggleSSAA()"
        >
          <div class="toggle-thumb"></div>
        </div>
      </div>

      <div class="settings-section">
        <label class="settings-label">Framerate</label>
        <div class="quality-tabs">
          <button
            v-for="fps in [30, 60]"
            :key="fps"
            @click="
              graphics.fpsCap = fps;
              graphics.markCustom();
            "
            class="quality-tab-btn"
            :class="{ active: graphics.fpsCap === fps }"
          >
            {{ fps }} FPS
          </button>
        </div>
      </div>
    </div>

    <button
      @click="fractalEngine.startRecording(15)"
      class="button-primary button-record"
      title="Record"
    >
      ◯
    </button>
  </div>
</template>

<style lang="scss" scoped>
.graphics-settings-panel {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: var(--text-primary);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-label {
  font-size: 11px;
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: 0.5px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.value-display {
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-color, #4facfe);
}

.custom-slider {
  width: 100%;
  accent-color: var(--text-primary);
  cursor: pointer;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  appearance: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: #ffffff;
    border-radius: 50%;
  }
}

/* Quality Tab Group */
.quality-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  padding: 4px;
  border-radius: 8px;
  gap: 4px;
}

.quality-tab-btn {
  flex: 1;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-weight: 600;
  text-transform: capitalize;
  padding: 8px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.03);
  }

  &.active {
    background: var(--border-medium);
    color: var(--text-primary);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
}

/* Advanced Options Area */
.advanced-options {
  gap: 20px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.option-title {
  font-size: 13px;
  font-weight: 500;
  margin: 0 0 2px 0;
}

.option-desc {
  font-size: 10px;
  opacity: 0.4;
  margin: 0;
  line-height: 1.4;
}

/* Toggle Switch */
.toggle-track {
  width: 42px;
  height: 22px;
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  flex-shrink: 0;

  &.on {
    background: var(--color-info);
    .toggle-thumb {
      transform: translateX(20px);
    }
  }
}

.toggle-thumb {
  width: 16px;
  height: 16px;
  background: var(--text-primary);
  border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.mini-select {
  background: transparent;
  color: var(--text-primary);
  font-size: 12px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2px 0;
  cursor: pointer;
  outline: none;

  option {
    background: var(--bg-surface);
  }
}

.button-record {
  color: var(--color-danger);

  &:hover {
    border-color: var(--color-danger);
  }
}
</style>
