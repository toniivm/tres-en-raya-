<template>
  <button
    class="cell"
    :class="[value ? value.toLowerCase() : 'empty', { winning: isWinning }]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <span
      v-if="value"
      class="cell-value"
    >{{ value }}</span>
  </button>
</template>

<script setup>
defineProps({
  value: { type: String, default: null },
  isWinning: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.cell {
  aspect-ratio: 1;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
  font-size: 2.5rem;
}

.cell.empty:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(0.96);
}

.cell.x {
  border-color: rgba(102, 126, 234, 0.5);
  cursor: default;
}

.cell.o {
  border-color: rgba(240, 147, 251, 0.5);
  cursor: default;
}

.cell-value {
  font-weight: 900;
  line-height: 1;
}

.cell.x .cell-value { color: #667eea; }
.cell.o .cell-value { color: #f093fb; }

.cell.winning {
  background: rgba(255, 215, 0, 0.15);
  border-color: #ffd700;
  animation: pulse 0.7s ease-in-out infinite alternate;
}

@keyframes pulse {
  from { box-shadow: 0 0 4px rgba(255, 215, 0, 0.3); }
  to   { box-shadow: 0 0 16px rgba(255, 215, 0, 0.8); }
}

.cell:disabled.empty {
  cursor: default;
}
</style>
