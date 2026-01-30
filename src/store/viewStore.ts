import { defineStore } from "pinia";
import gsap from "gsap";
import { useInteractionStore } from "./interactionStore";

export const useViewStore = defineStore("view", {
  state: () => ({
    zoom: 2,
    offset: {
      x: 0,
      y: 0,
    },
    isUiVisible: true,
  }),

  actions: {
    toggleUi() {
      this.isUiVisible = !this.isUiVisible;
    },

    resetView() {
      gsap.to(this, {
        zoom: 2.0,
        duration: 1.5,
        ease: "expo.inOut",
      });

      gsap.to(this.offset, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "expo.inOut",
      });
    },

    smoothZoom(delta: number) {
      const interaction = useInteractionStore();
      const zoomSpeed = 0.2;
      const factor = delta > 0 ? 1 + zoomSpeed : 1 - zoomSpeed;
      const newZoom = this.zoom * factor;

      const dx = interaction.mouse.x * (this.zoom - newZoom);
      const dy = interaction.mouse.y * (this.zoom - newZoom);

      gsap.to(this, {
        zoom: newZoom,
        duration: 0.4,
        ease: "power2.out",
      });

      // Directly tween the values inside the offset object
      gsap.to(this.offset, {
        x: this.offset.x + dx,
        y: this.offset.y + dy,
        duration: 0.4,
        ease: "power2.out",
      });
    },
  },
});
