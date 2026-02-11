<script setup lang="ts">
import { nextTick, ref } from "vue";
import { useFractalStore } from "../../store/useFractalStore";
import { usePresetStore } from "../../store/usePresetStore";
import IconChevron from "../icons/IconChevron.vue";
import IconSave from "../icons/IconSave.vue";
import BaseDropdown from "../ui/BaseDropdown.vue";

const presets = usePresetStore();
const fractal = useFractalStore();

const dropdown = ref<InstanceType<typeof BaseDropdown> | null>(null);
const saveInputRef = ref<HTMLInputElement | null>(null);

const isSaving = ref(false);
const newPresetName = ref("");

const startSaving = async () => {
  isSaving.value = true;
  newPresetName.value = `Cool ${fractal.formulaId}`;
  await nextTick();
  saveInputRef.value?.focus();
  saveInputRef.value?.select();
};

const confirmSave = () => {
  if (newPresetName.value.trim()) {
    presets.saveCurrentAsPreset(newPresetName.value.trim());
    isSaving.value = false;
  }
};

const cancelSave = () => {
  isSaving.value = false;
};

const handleDelete = (id: string) => {
  if (confirm("Delete this preset?")) {
    presets.deletePreset(id);
  }
};

const handleSelect = (preset: any) => {
  presets.applyPreset(preset);
  dropdown.value?.close();
};
</script>

<template>
  <div class="control-group">
    <label class="control-label">Presets</label>

    <div class="manager-grid">
      <div class="main-slot">
        <BaseDropdown
          v-if="!isSaving"
          ref="dropdown"
          v-model="presets.currentPresetId"
          :options="presets.savedPresets"
          identity-key="id"
          menu-class="upward-menu"
        >
          <template #trigger="{ isOpen }">
            <div class="interactive-surface preset-trigger">
              <span class="truncate">{{ presets.currentPresetName }}</span>
              <IconChevron :is-open="isOpen" />
            </div>
          </template>

          <template #option="{ option }">
            <div class="preset-item" @click="handleSelect(option)">
              <div class="preset-info">
                <span class="preset-name">{{ option.label }}</span>
                <span class="preset-meta">{{ option.formulaId }}</span>
              </div>
              <button
                class="button-delete"
                @click.stop="handleDelete(option.id)"
              >
                ×
              </button>
            </div>
          </template>
        </BaseDropdown>

        <input
          v-else
          ref="saveInputRef"
          v-model="newPresetName"
          class="interactive-surface save-input"
          @keyup.enter="confirmSave"
          @keyup.esc="cancelSave"
          type="text"
          autocomplete="off"
        />
      </div>

      <div class="action-slot">
        <button
          v-if="!isSaving"
          class="button-primary icon-btn"
          @click="startSaving"
          title="Save Preset"
        >
          <IconSave />
        </button>

        <div v-else class="confirm-cancel-group">
          <button class="button-primary confirm" @click="confirmSave">✓</button>
          <button class="button-primary cancel" @click="cancelSave">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Note: box-sizing is now handled by your new global reset! */

.manager-grid {
  display: grid;
  /* Action slot is 32px when button, 52px when two buttons. 
     Or keep it 1fr + 64px to ensure no jumping */
  grid-template-columns: 1fr auto;
  gap: 8px;
  width: 100%;
}

.main-slot {
  min-width: 0;
}

.preset-trigger {
  height: 32px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.save-input {
  width: 100%;
  height: 32px;
  padding: 0 10px;
  font-size: 0.85rem;
  outline: none;
  background: rgba(255, 255, 255, 0.05);
  &:focus {
    border-color: var(--color-success);
  }
}

.action-slot {
  display: flex;
  align-items: center;
  height: 32px;
}

.icon-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirm-cancel-group {
  display: flex;
  gap: 4px;

  .confirm {
    color: var(--color-success);
  }
  .cancel {
    color: var(--color-danger);
  }
}

:deep(.upward-menu) {
  bottom: calc(100% + 4px);
  top: auto;
}

.preset-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  .preset-info {
    display: flex;
    flex-direction: column;
    .preset-name {
      font-size: 0.85rem;
    }
    .preset-meta {
      font-size: 0.65rem;
      opacity: 0.4;
      font-family: monospace;
    }
  }
}

.button-delete {
  color: var(--color-danger);
  font-size: 1.2rem;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
}
</style>
