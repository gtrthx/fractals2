<script setup lang="ts">
import { computed } from "vue";
import { useFractalStore } from "../../store/fractalStore";
import { useFractalTheme } from "../../composables/useFractalTheme";
import SlidableValue from "../SlidableValue.vue";

import { BASE_CONTROL_GROUPS } from "../../constants/ui/base-control-groups";
import { FORMULAS } from "../../constants/formulas";
import { DEFAULT_SLIDER_PARAMS } from "../../constants/ui/default-slider-params";

import type { ControlGroup } from "../../types/control-group";
import type { SliderSchema } from "../../types/slider-schema";
import type { BaseFractalParams } from "../../types/base-fractal-params";

const fractalStore = useFractalStore();
const { colors, getColor, mathStyles } = useFractalTheme();

const activeControls = computed<ControlGroup[]>(() => {
  const formula = FORMULAS.find((f) => f.id === fractalStore.formulaId);
  if (!formula) return [];

  const groups =
    formula.customUI || BASE_CONTROL_GROUPS[formula.fractalType] || [];

  const iterationGroup: ControlGroup = {
    label: "Iterations",
    colorKey: "iter",
    sliders: [{ varName: "maxIterations" } as SliderSchema],
  };

  return [...groups, iterationGroup];
});

const getSliderProps = (slider: SliderSchema) => ({
  ...DEFAULT_SLIDER_PARAMS[slider.varName],
  ...slider,
});
</script>

<template>
  <div class="fractal-controls">
    <div id="formula-display">
      <template v-if="fractalStore.formulaId === 'mandelbrot'">
        <span :style="mathStyles.z">z</span>
        <sup :style="{ color: colors.power }">P</sup> +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'burning-ship'">
        (|Re(<span :style="mathStyles.z">z</span>)| + i|Im(<span
          :style="mathStyles.z"
          >z</span
        >)|) <sup :style="{ color: colors.power }">P</sup> +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'tricorn'">
        <span :style="mathStyles.z">z̅</span>
        <sup :style="{ color: colors.power }">P</sup> +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'buffalo'">
        |<span :style="mathStyles.z">z</span
        ><sup :style="{ color: colors.power }">P</sup>| +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'celtic'">
        |Re(<span :style="mathStyles.z">z</span
        ><sup :style="{ color: colors.power }">P</sup>)| + iIm(<span
          :style="mathStyles.z"
          >z</span
        ><sup :style="{ color: colors.power }">P</sup>) +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'magnet'">
        ((<span :style="mathStyles.z">z</span>² +
        <span :style="mathStyles.c">c</span> - 1) / (2<span
          :style="mathStyles.z"
          >z</span
        >
        + <span :style="mathStyles.c">c</span> - 2))
        <sup :style="{ color: colors.power }">P</sup>
      </template>

      <template v-else-if="fractalStore.formulaId === 'inv-mandel'">
        <span :style="mathStyles.z">z</span
        ><sup :style="{ color: colors.power }">P</sup> + 1/
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'inv-exp'">
        1/<span :style="mathStyles.z">z</span
        ><sup :style="{ color: colors.power }">P</sup> +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-else-if="fractalStore.formulaId === 'lambda'">
        <span :style="mathStyles.c">c</span> ·
        <span :style="mathStyles.z">z</span>(1 -
        <span :style="mathStyles.z">z</span>)
      </template>

      <template v-else-if="fractalStore.formulaId === 'spider'">
        <div class="spider-layout">
          <div>
            <span :style="mathStyles.z">z</span
            ><sup :style="{ color: colors.power }">P</sup> +
            <span :style="mathStyles.c">c</span>
          </div>
          <div class="sub-formula">
            <span :style="mathStyles.c">c</span> →
            <span :style="mathStyles.c">c</span>/2 +
            <span :style="mathStyles.z">z</span>
          </div>
        </div>
      </template>

      <template v-else-if="fractalStore.formulaId === 'heart'">
        (|Re(<span :style="mathStyles.z">z</span>)| + iIm(<span
          :style="mathStyles.z"
          >z</span
        >)) <sup :style="{ color: colors.power }">P</sup> +
        <span :style="mathStyles.c">c</span>
      </template>

      <template v-if="fractalStore.formulaId === 'newton-std'">
        <span :style="mathStyles.z">z</span
        ><sup :style="{ color: colors.power }">P</sup> - 1 = 0
      </template>

      <template v-else-if="fractalStore.formulaId === 'newton-sin'">
        <span :style="mathStyles.z">z</span> -
        <span :style="{ color: colors.power }">a</span> · tan(<span
          :style="mathStyles.z"
          >z</span
        >)
      </template>
    </div>
  </div>

  <div class="controls-wrapper">
    <div
      v-for="group in activeControls"
      :key="group.label"
      class="control-group"
    >
      <div class="label" :style="{ color: getColor(group.colorKey) }">
        {{ group.label }}:
      </div>

      <template v-for="slider in group.sliders" :key="slider.varName">
        <span
          v-if="slider.showPlus"
          :style="{ color: getColor(group.colorKey) }"
          >+</span
        >

        <SlidableValue
          v-model="
            fractalStore.params.slider[
              slider.varName as keyof BaseFractalParams
            ]
          "
          :varName="slider.varName"
          :color="getColor(group.colorKey)"
          :step="getSliderProps(slider).step"
          :min="getSliderProps(slider).min"
          :max="getSliderProps(slider).max"
        />

        <span v-if="slider.suffix" :style="{ color: getColor(group.colorKey) }">
          {{ slider.suffix }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.fractal-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

#formula-display {
  background: rgba(0, 0, 0, 0.4);
  padding: 20px;
  text-align: center;
  font-family: "Times New Roman", serif;
  font-style: italic;
  font-size: 24px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  user-select: none;
}

.spider-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.sub-formula {
  font-size: 0.6em;
  opacity: 0.6;
}

.controls-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
}

.label {
  width: 110px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}
</style>
