<script setup lang="ts">
import { computed } from "vue";
import { useFractalStore } from "../../store/fractalStore";
import SlidableValue from "./../SlidableValue.vue";
import type { NewtonParams } from "../../types/fractals/newton-params";

const store = useFractalStore();

const params = computed(() => store.sliderParams as NewtonParams);
</script>

<template>
  <div id="formula-display">
    <div class="formula-display">
      <code
        >z<sub>n+1</sub> = z<sub>n</sub> - d · (z<sup>p</sup> + c) / (p ·
        z<sup>p-1</sup>) + m</code
      >
    </div>
  </div>

  <div>
    <span>Damping: </span>
    <SlidableValue
      v-model="params.dampingR"
      varName="dampingR"
      color="#ff00aa"
    />
    <span> + </span>
    <SlidableValue
      v-model="params.dampingI"
      varName="dampingI"
      color="#ff00aa"
    />
    <span>i</span>
  </div>
  <div>
    <span>Power: </span>
    <SlidableValue v-model="params.power" varName="power" color="#ff00aa" />
  </div>
  <div>
    <span>Power I: </span>
    <SlidableValue
      v-model="params.powerImaginary"
      varName="powerImaginary"
      color="#ff00aa"
    />
  </div>

  <div>
    <span>Memory </span>
    <SlidableValue v-model="params.memoryR" varName="memoryR" color="#ff00aa" />
    <span> + </span>
    <SlidableValue v-model="params.memoryI" varName="memoryI" color="#ff00aa" />
    <span>i</span>
  </div>

  <div>
    <span>Julia morph</span>
    <SlidableValue
      v-model="params.juliaMorph"
      varName="juliaMorph"
      color="#ff00aa"
      :step="0.01"
    />
    <span>i</span>
  </div>
</template>

<style scoped>
#formula-display {
  background: rgba(0, 0, 0, 0.4);
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  font-family: "Times New Roman", serif;
  font-style: italic;
  font-size: 17px;
  line-height: 1.8;
  min-height: 40px;
  color: #eee;
}
</style>
