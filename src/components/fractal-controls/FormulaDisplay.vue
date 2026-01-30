<script setup lang="ts">
import { computed } from "vue";
import { useFractalStore } from "../../store/useFractalStore";
import { useFractalTheme } from "../../composables/useFractalTheme";

const fractalStore = useFractalStore();
const { colors, mathStyles } = useFractalTheme();

const currentFormulaId = computed(() => fractalStore.formulaId);
</script>

<template>
  <div id="formula-display">
    <template v-if="currentFormulaId === 'mandelbrot'">
      <span :style="mathStyles.zStyle">z</span>
      <sup :style="{ color: colors.power }">P</sup> +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'burning-ship'">
      (|Re(<span :style="mathStyles.zStyle">z</span>)| + i|Im(<span
        :style="mathStyles.zStyle"
        >z</span
      >)|) <sup :style="{ color: colors.power }">P</sup> +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'tricorn'">
      <span :style="mathStyles.zStyle">z̅</span>
      <sup :style="{ color: colors.power }">P</sup> +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'buffalo'">
      |<span :style="mathStyles.zStyle">z</span
      ><sup :style="{ color: colors.power }">P</sup>| +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'celtic'">
      |Re(<span :style="mathStyles.zStyle">z</span
      ><sup :style="{ color: colors.power }">P</sup>)| + iIm(<span
        :style="mathStyles.zStyle"
        >z</span
      ><sup :style="{ color: colors.power }">P</sup>) +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'magnet'">
      ((<span :style="mathStyles.zStyle">z</span>² +
      <span :style="mathStyles.cStyle">c</span> - 1) / (2<span
        :style="mathStyles.zStyle"
        >z</span
      >
      + <span :style="mathStyles.cStyle">c</span> - 2))
      <sup :style="{ color: colors.power }">P</sup>
    </template>

    <template v-else-if="currentFormulaId === 'inv-mandel'">
      <span :style="mathStyles.zStyle">z</span
      ><sup :style="{ color: colors.power }">P</sup> + 1/
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'inv-exp'">
      1/<span :style="mathStyles.zStyle">z</span
      ><sup :style="{ color: colors.power }">P</sup> +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-else-if="currentFormulaId === 'lambda'">
      <span :style="mathStyles.cStyle">c</span> ·
      <span :style="mathStyles.zStyle">z</span>(1 -
      <span :style="mathStyles.zStyle">z</span>)
    </template>

    <template v-else-if="currentFormulaId === 'spider'">
      <div class="spider-layout">
        <div>
          <span :style="mathStyles.zStyle">z</span
          ><sup :style="{ color: colors.power }">P</sup> +
          <span :style="mathStyles.cStyle">c</span>
        </div>
        <div class="sub-formula">
          <span :style="mathStyles.cStyle">c</span> →
          <span :style="mathStyles.cStyle">c</span>/2 +
          <span :style="mathStyles.zStyle">z</span>
        </div>
      </div>
    </template>

    <template v-else-if="currentFormulaId === 'heart'">
      (|Re(<span :style="mathStyles.zStyle">z</span>)| + iIm(<span
        :style="mathStyles.zStyle"
        >z</span
      >)) <sup :style="{ color: colors.power }">P</sup> +
      <span :style="mathStyles.cStyle">c</span>
    </template>

    <template v-if="currentFormulaId === 'newton-std'">
      <span :style="mathStyles.zStyle">z</span
      ><sup :style="{ color: colors.power }">P</sup> - 1 = 0
    </template>

    <template v-else-if="currentFormulaId === 'newton-sin'">
      <span :style="mathStyles.zStyle">z</span> -
      <span :style="{ color: colors.power }">a</span> · tan(<span
        :style="mathStyles.zStyle"
        >z</span
      >)
    </template>
  </div>
</template>

<style scoped>
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
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
