import { onMounted, onUnmounted } from "vue";
import { useInteractionStore } from "../store/interactionStore";
import { useViewStore } from "../store/viewStore";

export function useMouseInteraction(canvasRef: {
  value: HTMLCanvasElement | null;
}) {
  const interactionStore = useInteractionStore();
  const viewStore = useViewStore();
  let isCanvasDragging = false;

  const updateMousePos = (e: MouseEvent) => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const divisor = Math.min(canvas.clientWidth, canvas.clientHeight);

    const x = (e.clientX - rect.left - canvas.clientWidth / 2) / divisor;
    const y = -(e.clientY - rect.top - canvas.clientHeight / 2) / divisor;

    interactionStore.updateMouse(x, y);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isCanvasDragging && e.buttons === 1) {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const divisor = Math.min(canvas.clientWidth, canvas.clientHeight);

      viewStore.offset.x -= (e.movementX / divisor) * viewStore.zoom;
      viewStore.offset.y += (e.movementY / divisor) * viewStore.zoom;
    }

    updateMousePos(e);
  };
  const handleGlobalClick = (e: MouseEvent) => {
    if (!interactionStore.activeAxis) return;
    if (!(e.target as HTMLElement).closest(".slidable-number")) {
      interactionStore.activeAxis = null;
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
