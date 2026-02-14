<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { computed, ref } from "vue"; // Added computed
import IconChevron from "../icons/IconChevron.vue";

const props = defineProps<{
  label?: string;
  options?: any[];
  modelValue: any;
  identityKey?: string;
  menuClass?: string;
  displayValue?: string;
}>();

const emit = defineEmits(["update:modelValue", "select"]);
const isOpen = ref(false);
const isUpward = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// --- CYCLING LOGIC ---

const currentIndex = computed(() => {
  if (!props.options) return -1;
  return props.options.findIndex((opt) => isSelected(opt));
});

const cycle = (direction: number) => {
  if (!props.options || props.options.length === 0) return;

  const len = props.options.length;
  const nextIdx = (currentIndex.value + direction + len) % len;
  const nextOpt = props.options[nextIdx];

  const val = props.identityKey ? nextOpt[props.identityKey] : nextOpt;
  emit("update:modelValue", val);
  emit("select", nextOpt);
};

const handleKeyDown = (e: KeyboardEvent) => {
  const isUp = e.key === "ArrowUp" || e.key === "ArrowLeft";
  const isDown = e.key === "ArrowDown" || e.key === "ArrowRight";

  if (isUp || isDown) {
    e.preventDefault();
    e.stopPropagation();

    cycle(isUp ? -1 : 1);
  }

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleDropdown();
  }

  if (e.key === "Escape") {
    isOpen.value = false;
  }
};

const close = () => {
  isOpen.value = false;
};
const toggle = () => {
  isOpen.value = !isOpen.value;
};
defineExpose({ close, toggle });

onClickOutside(dropdownRef, () => (isOpen.value = false));

const toggleDropdown = async () => {
  if (!isOpen.value) {
    const rect = dropdownRef.value?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      isUpward.value = spaceBelow < 250;
    }
  }
  isOpen.value = !isOpen.value;
};

const getOptId = (opt: any) =>
  props.identityKey ? opt[props.identityKey] : opt;
const isSelected = (opt: any) => {
  const currentId = props.modelValue;
  return getOptId(opt) === currentId;
};

const select = (opt: any) => {
  const val = props.identityKey ? opt[props.identityKey] : opt;
  emit("update:modelValue", val);
  emit("select", opt);
  isOpen.value = false;
};
</script>

<template>
  <div
    class="control-group"
    ref="dropdownRef"
    tabindex="0"
    @keydown="handleKeyDown"
  >
    <label v-if="label" class="control-label">{{ label }}</label>

    <div class="dropdown-root">
      <div class="trigger-container" @click="toggleDropdown">
        <slot name="trigger" :is-open="isOpen">
          <div
            class="interactive-surface default-trigger"
            :class="{ open: isOpen }"
          >
            <span>{{ displayValue }}</span>
            <IconChevron :is-open="isOpen" />
          </div>
        </slot>
      </div>

      <Transition name="dropdown-fade">
        <div
          v-if="isOpen"
          class="dropdown-menu custom-scrollbar"
          :class="[menuClass, { 'is-upward': isUpward }]"
        >
          <slot name="list">
            <div class="default-list">
              <div
                v-for="opt in options"
                :key="getOptId(opt)"
                class="default-item"
                :class="{ active: isSelected(opt) }"
                @click="select(opt)"
              >
                <slot name="option" :option="opt">
                  {{ opt.label || opt }}
                </slot>
              </div>
            </div>
          </slot>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown-root {
  position: relative;
  width: 100%;
}

.default-trigger {
  height: 32px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 0.85rem;
  user-select: none;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 220px;
  overflow-y: auto;
  background: var(--bg-surface);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  z-index: 1000;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);

  &.is-upward {
    top: auto;
    bottom: calc(100% + 4px);
  }
}

.default-item {
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.85rem;
  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  &.active {
    color: var(--accent-color);
    background: rgba(255, 255, 255, 0.04);
  }
}

.control-group:focus-visible {
  outline: none;
  .default-trigger {
    border-color: var(--accent-color);
    background: rgba(255, 255, 255, 0.05);
  }
}

.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
