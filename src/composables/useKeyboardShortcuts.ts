import { onMounted, onUnmounted } from "vue";
import { useFractalStore } from "../store/fractalStore";
import { usePaletteStore } from "../store/paletteStore";
import { useInteractionStore } from "../store/interactionStore";
import { useViewStore } from "../store/viewStore";

export function useKeyboardShortcuts() {
  const fractalStore = useFractalStore();
  const paletteStore = usePaletteStore();
  const interactionStore = useInteractionStore();
  const viewStore = useViewStore();

  const shortcuts: Record<string, (e: KeyboardEvent) => void> = {
    Space: (e) => {
      e.preventDefault();
      interactionStore.togglePause();
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
    KeyA: () => interactionStore.toggleTargetAxis("x"),
    KeyD: () => interactionStore.toggleTargetAxis("y"),
    KeyG: () => interactionStore.unbindAll(),

    Digit1: () => fractalStore.switchFractalType("escape"),
    Digit2: () => fractalStore.switchFractalType("newton"),
    Digit3: () => fractalStore.switchFractalType("nova"),
    ArrowRight: () => fractalStore.nextFormula(),
    ArrowLeft: () => fractalStore.prevFormula(),
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const action = shortcuts[e.code];
    if (action) action(e);
  };

  onMounted(() => window.addEventListener("keydown", handleKeyDown));
  onUnmounted(() => window.removeEventListener("keydown", handleKeyDown));
}
