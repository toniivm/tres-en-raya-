<template>
  <div class="game-board">
    <GameCell
      v-for="(cell, index) in board"
      :key="index"
      :value="cell"
      :is-winning="winningCells.includes(index)"
      :disabled="gameOver || !!cell"
      @click="emit('cell-click', index)"
    />
  </div>
</template>

<script setup>
import GameCell from './GameCell.vue'

defineProps({
  board: { type: Array, required: true },
  winningCells: { type: Array, required: true },
  gameOver: { type: Boolean, required: true }
})

const emit = defineEmits(['cell-click'])
</script>

<style scoped>
.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 360px;
  margin: 1rem auto;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
