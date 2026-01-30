import { onMounted, onUnmounted } from "vue";
import { useInputStore } from "../store/useInputStore";
import { useViewStore } from "../store/useViewStore";

export function useMouseInteraction(canvasRef: {
  value: HTMLCanvasElement | null;
}) {
  const inputStore = useInputStore();
  const viewStore = useViewStore();
  let isCanvasDragging = false;

  const updateMousePos = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const baseDimention = Math.min(canvas.clientWidth, canvas.clientHeight);

    const x = (e.clientX - rect.left - canvas.clientWidth / 2) / baseDimention;
    const y = -(e.clientY - rect.top - canvas.clientHeight / 2) / baseDimention;

    inputStore.updateMouse(x, y);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isCanvasDragging && e.buttons === 1) {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const baseDimention = Math.min(canvas.clientWidth, canvas.clientHeight);

      viewStore.offset.x -= (e.movementX / baseDimention) * viewStore.zoom;
      viewStore.offset.y += (e.movementY / baseDimention) * viewStore.zoom;
    }

    updateMousePos(e);
  };
  const handleGlobalClick = (e: MouseEvent) => {
    if (!inputStore.activeAxis) return;
    if (!(e.target as HTMLElement).closest(".axis-container")) {
      inputStore.activeAxis = null;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    viewStore.smoothZoom(e.deltaY);
  };

  onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    canvas.addEventListener("mousedown", () => (isCanvasDragging = true));
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", () => (isCanvasDragging = false));
    window.addEventListener("mousedown", handleGlobalClick);
    canvas.addEventListener("wheel", handleWheel, { passive: false });
  });

  onUnmounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mousedown", handleGlobalClick);
    canvas.removeEventListener("wheel", handleWheel);
  });
}
