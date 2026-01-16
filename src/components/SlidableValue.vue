<script setup lang="ts">
import { ref, watch } from "vue";
import gsap from "gsap";
import { useFractalStore } from "../store/fractalStore";

const props = defineProps<{
  modelValue: number;
  step?: number;
  varName: string;
  color?: string;
}>();

const store = useFractalStore();

const emit = defineEmits(["update:modelValue"]);
const isDragging = ref(false);

// We animate this PLAIN object, which Vue doesn't track as a Proxy
const tweenTarget = { val: props.modelValue };

// Keep the tweenTarget in sync if the value changes from outside (like a Reset)
watch(
  () => props.modelValue,
  (newVal) => {
    if (!isDragging.value) tweenTarget.val = newVal;
  }
);

let startX = 0;
let startValue = 0;

const handleClick = (e: MouseEvent) => {
  if (store.activeTargetAxis) {
    // If we are in "Select Mode", don't drag—just bind!
    store.bindVariable(props.varName);
  } else {
    startDrag(e); // Your existing drag logic
  }
};

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX = e.clientX;
  startValue = props.modelValue;

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
  document.body.style.cursor = "ew-resize";
};

const onDrag = (e: MouseEvent) => {
  const sensitivity = props.step || 0.01;
  const delta = (e.clientX - startX) * sensitivity;
  const targetVal = startValue + delta;

  // Animate the plain object 'tweenTarget'
  gsap.to(tweenTarget, {
    val: targetVal,
    duration: 0.25, // This provides the "fluid" easing
    ease: "power2.out",
    overwrite: true, // Prevents multiple tweens from fighting
    onUpdate: () => {
      // Push the smoothed value back to the store
      emit("update:modelValue", tweenTarget.val);
    },
  });
};

const stopDrag = () => {
  isDragging.value = false;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
  document.body.style.cursor = "default";
};
</script>

<template>
  <span
    class="slidable-number"
    :class="{
      'is-dragging': isDragging,
      'is-pickable': store.activeTargetAxis !== null,
    }"
    :style="{ color: color || '#646cff' }"
    @mousedown="handleClick"
  >
    {{ (store.liveParams[varName] ?? modelValue).toFixed(2) }}
  </span>
</template>

<style scoped>
.slidable-number {
  cursor: ew-resize;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  padding: 0 4px;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.3);
  user-select: none;
  display: inline-block;
  transition: background 0.2s, color 0.2s;
}

.slidable-number:hover {
  background: rgba(255, 255, 255, 0.15);
}

.is-dragging {
  background: rgba(100, 108, 255, 0.4);
  border-bottom-style: solid;
}
.is-pickable {
  cursor: cell !important;
  outline: 2px dashed rgba(255, 255, 255, 0.5);
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
