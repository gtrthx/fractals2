import { onMounted, onUnmounted } from "vue";
import { useFractalStore } from "../store/fractalStore";

export function useMouseInteraction(canvasRef: {
  value: HTMLCanvasElement | null;
}) {
  const store = useFractalStore();
  const updateMousePos = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    // 1. Get pixel position relative to canvas center
    const relX = e.clientX - rect.left - canvas.clientWidth / 2;
    const relY = e.clientY - rect.top - canvas.clientHeight / 2;

    // 2. Match the shader's aspect ratio logic
    const divisor = Math.min(canvas.clientWidth, canvas.clientHeight);

    // 3. Update the store (Y is inverted in WebGL vs DOM)
    store.mouseX = relX / divisor;
    store.mouseY = -relY / divisor;
  };

  const handleMouseMove = (e: MouseEvent) => {
    // If Left Mouse Button is held down, we pan
    if (e.buttons === 1) {
      const canvas = canvasRef.value;
      if (!canvas) return;

      const divisor = Math.min(canvas.clientWidth, canvas.clientHeight);

      // PANNING LOGIC
      // We divide by divisor to match the coordinate space,
      // then multiply by zoom so the pan speed matches the visual depth.
      store.offsetShiftX -= (e.movementX / divisor) * store.zoom;
      store.offsetShiftY += (e.movementY / divisor) * store.zoom;
    }

    // Always update coordinates so zoom-to-point knows where we are
    updateMousePos(e);
  };

  const handleGlobalClick = (e: MouseEvent) => {
    if (!store.activeTargetAxis) return;

    // Check if the click was on a SlidableValue
    // We check if the clicked element (or its parents) has the slidable class
    const target = e.target as HTMLElement;
    const isSlidable = target.closest(".slidable-number");

    // If it's NOT a slidable number, exit select mode
    if (!isSlidable) {
      store.activeTargetAxis = null;
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      e.preventDefault();
      store.togglePause();
    }

    if (e.code === "KeyR") {
      e.preventDefault();
      store.resetView();
    }

    if (e.code === "Backquote") {
      e.preventDefault();
      store.toggleUi();
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    store.smoothZoom(e.deltaY);
  };

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    // We use handleMouseMove now to cover both hover and drag
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleGlobalClick);
    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
  });

  onUnmounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    canvas.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleGlobalClick);
    canvas.removeEventListener("wheel", handleWheel);
  });
}
