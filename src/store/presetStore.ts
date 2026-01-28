import { defineStore } from "pinia";
import { DEFAULT_PRESETS } from "../constants/default-presets";
import type { FractalState } from "../types/fractal-state";
import type { Preset } from "../types/preset";

export const usePresetStore = defineStore("presets", {
  state: () => ({
    userPresets: JSON.parse(
      localStorage.getItem("user_presets") || "[]"
    ) as Preset[],
    defaultPresets: DEFAULT_PRESETS,
  }),

  actions: {
    saveCurrentState(name: string, currentState: FractalState) {
      const newPreset: Preset = {
        ...currentState,
        id: crypto.randomUUID(),
        name: name,
      };
      this.userPresets.push(newPreset);
      this.syncStorage();
    },

    deletePreset(id: string) {
      this.userPresets = this.userPresets.filter((p) => p.id !== id);
      this.syncStorage();
    },

    syncStorage() {
      localStorage.setItem("user_presets", JSON.stringify(this.userPresets));
    },
  },
});
