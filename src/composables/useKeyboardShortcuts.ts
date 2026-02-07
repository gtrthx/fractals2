import { onMounted, onUnmounted } from "vue";
import { useFractalStore } from "../store/useFractalStore";
import { usePaletteStore } from "../store/usePaletteStore";
import { useInputStore } from "../store/useInputStore";
import { useViewStore } from "../store/useViewStore";
import { captureThumbnail, downloadImage } from "../utils/screenshot";

export function useKeyboardShortcuts() {
  const fractalStore = useFractalStore();
  const paletteStore = usePaletteStore();
  const inputStore = useInputStore();
  const viewStore = useViewStore();

  const shortcuts: Record<string, (e: KeyboardEvent) => void> = {
    Space: (e) => {
      e.preventDefault();
      inputStore.togglePause();
    },
    KeyW: (e) => {
      e.preventDefault();
      viewStore.resetView();
    },
    Backquote: (e) => {
      e.preventDefault();
      viewStore.toggleUi();
    },
    KeyQ: () => paletteStore.prevPalette(),
    KeyE: () => paletteStore.nextPalette(),
    KeyT: () => paletteStore.generateRandomPalette(),

    KeyR: () => fractalStore.randomizeParams(),
    KeyA: () => inputStore.toggleTargetAxis("x"),
    KeyD: () => inputStore.toggleTargetAxis("y"),
    KeyG: () => inputStore.unbindAll(),
    KeyS: () => {
      const canvas = document.querySelector("canvas");
      captureThumbnail(canvas, 0.1).then((thumb) => {
        console.log(thumb);
        downloadImage(thumb, `fractal_${fractalStore.formulaId}.webp`);
      }); // 10% size
    },

    Digit1: () => fractalStore.switchFractalType("escape"),
    Digit2: () => fractalStore.switchFractalType("newton"),
    Digit3: () => fractalStore.switchFractalType("nova"),
    Digit4: () => fractalStore.switchFractalType("kleinian"),
    ArrowRight: () => fractalStore.nextFormula(),
    ArrowLeft: () => fractalStore.prevFormula(),
    Escape: () => (inputStore.activeAxis = null),
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const action = shortcuts[e.code];
    if (action) action(e);
  };

  onMounted(() => window.addEventListener("keydown", handleKeyDown));
  onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
}
