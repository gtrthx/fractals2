<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
  <span class="chevron" :class="{ 'is-open': isOpen }">▼</span>
</template>

<style scoped lang="scss">
.chevron {
  font-size: 10px;
  color: var(--text-secondary);
  opacity: 0.6;
  width: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: 0.2s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}
</style>
