import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { QualityLevel, ResolutionConfig } from "../types/engine";
import { useFractalStore } from "./useFractalStore";

export const useGraphicsStore = defineStore("graphics", () => {
  const qualityLevel = ref<QualityLevel>("medium");
  const fpsCap = ref(60);
  const useSSAA = ref(false);
  const resolutionPreset = ref("native");
  const resolutionScale = ref(1.0);

  const QUALITY_PRESETS: Record<Exclude<QualityLevel, "custom">, any> = {
    low: { useSSAA: false, fpsCap: 30, iterLimit: 80, scale: 0.6 },
    medium: { useSSAA: false, fpsCap: 60, iterLimit: 100, scale: 1.0 },
    high: { useSSAA: false, fpsCap: 60, iterLimit: 150, scale: 1.0 },
    ultra: { useSSAA: true, fpsCap: 60, iterLimit: 200, scale: 1.0 },
  };

  const RESOLUTION_MODES: Record<string, ResolutionConfig> = {
    native: { label: "Native (Window)", scale: 1.0 },
    "720p": { label: "HD (720p)", width: 1280, height: 720, scale: 1.0 },
    "1080p": {
      label: "Full HD (1080p)",
      width: 1920,
      height: 1080,
      scale: 1.0,
    },
    "4k": { label: "4K (Ultra HD)", width: 3840, height: 2160, scale: 1.0 },
    smartphone: {
      label: "Mobile (Vertical)",
      width: 1080,
      height: 1920,
      scale: 1.0,
    },
  };

  const isManual = computed(() => resolutionPreset.value !== "native");
  const activeResolution = computed(
    () => RESOLUTION_MODES[resolutionPreset.value],
  );

  function setQuality(level: QualityLevel) {
    qualityLevel.value = level;
    if (level !== "custom") {
      const qualityPreset = QUALITY_PRESETS[level];
      useSSAA.value = qualityPreset.useSSAA;
      fpsCap.value = qualityPreset.fpsCap;
      resolutionScale.value = qualityPreset.scale;

      const fractal = useFractalStore();
      fractal.maxIterations = qualityPreset.iterLimit;
    }
  }

  function markCustom() {
    qualityLevel.value = "custom";
  }

  function toggleSSAA() {
    useSSAA.value = !useSSAA.value;
    markCustom();
  }

  return {
    qualityLevel,
    fpsCap,
    useSSAA,
    resolutionPreset,
    RESOLUTION_MODES,
    isManual,
    activeResolution,
    resolutionScale,
    setQuality,
    toggleSSAA,
    markCustom,
  };
});
