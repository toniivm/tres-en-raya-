<template>
  <div class="scoreboard">
    <div
      v-for="player in players"
      :key="player.symbol"
      class="score-item"
      :class="player.symbol.toLowerCase()"
    >
      <span class="symbol">{{ player.symbol }}</span>
      <div class="info">
        <span class="name">{{ player.name }}</span>
        <span class="wins">{{ player.wins }} victorias</span>
      </div>
    </div>
    <div class="score-item draws">
      <span class="symbol">~</span>
      <div class="info">
        <span class="name">Empates</span>
        <span class="wins">{{ draws }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  players: { type: Array, required: true },
  draws: { type: Number, required: true }
})
</script>

<style scoped>
.scoreboard {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 130px;
}

.score-item.x { border-color: rgba(102, 126, 234, 0.5); }
.score-item.o { border-color: rgba(240, 147, 251, 0.5); }
.score-item.draws { border-color: rgba(160, 174, 192, 0.3); }

.symbol {
  font-size: 1.5rem;
  font-weight: 900;
  width: 2rem;
  text-align: center;
}

.score-item.x .symbol { color: #667eea; }
.score-item.o .symbol { color: #f093fb; }
.score-item.draws .symbol { color: #a0aec0; }

.info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.name {
  font-weight: 600;
  font-size: 0.9rem;
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wins {
  font-size: 0.78rem;
  color: #a0aec0;
}
</style>
