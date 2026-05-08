<template>
  <div class="app">
    <h1>Tres en Raya</h1>

    <PlayerSetup
      v-if="!gameStarted"
      :player1="players[0]"
      :player2="players[1]"
      @start="startGame"
    />

    <template v-else>
      <ScoreBoard :players="players" :draws="draws" />

      <div
        class="turn-indicator"
        :class="currentPlayer === 'X' ? 'player-x' : 'player-o'"
      >
        <span v-if="!winner && !isDraw">
          Turno de <strong>{{ currentPlayerName }}</strong>
          <span class="symbol">({{ currentPlayer }})</span>
        </span>
        <span v-else-if="winner" class="winner-message">
          🏆 ¡Gana {{ winnerName }}!
        </span>
        <span v-else class="draw-message">
          🤝 ¡Empate!
        </span>
      </div>

      <GameBoard
        :board="board"
        :winning-cells="winningCells"
        :game-over="!!winner || isDraw"
        @cell-click="handleCellClick"
      />

      <div class="move-counter">
        Movimiento {{ moveCount }} / 9
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="newGame">
          Nueva Partida
        </button>
        <button class="btn btn-secondary" @click="resetAll">
          Reiniciar Todo
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PlayerSetup from './components/PlayerSetup.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import GameBoard from './components/GameBoard.vue'
import { checkWinner, isBoardFull } from './gameLogic.js'

const gameStarted = ref(false)
const board = ref(Array(9).fill(null))
const currentPlayer = ref('X')
const winner = ref(null)
const winningCells = ref([])
const isDraw = ref(false)
const draws = ref(0)
const moveCount = ref(0)

const players = ref([
  { name: 'Jugador 1', symbol: 'X', wins: 0 },
  { name: 'Jugador 2', symbol: 'O', wins: 0 }
])

const currentPlayerName = computed(() =>
  players.value.find(p => p.symbol === currentPlayer.value)?.name
)

const winnerName = computed(() =>
  players.value.find(p => p.symbol === winner.value)?.name
)

function handleCellClick (index) {
  if (board.value[index] || winner.value || isDraw.value) return

  const newBoard = [...board.value]
  newBoard[index] = currentPlayer.value
  board.value = newBoard
  moveCount.value++

  const result = checkWinner(board.value)
  if (result) {
    winner.value = result.winner
    winningCells.value = result.cells
    players.value.find(p => p.symbol === result.winner).wins++
    return
  }

  if (isBoardFull(board.value)) {
    isDraw.value = true
    draws.value++
    return
  }

  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

function newGame () {
  board.value = Array(9).fill(null)
  currentPlayer.value = 'X'
  winner.value = null
  winningCells.value = []
  isDraw.value = false
  moveCount.value = 0
}

function resetAll () {
  players.value.forEach(p => { p.wins = 0 })
  draws.value = 0
  newGame()
}

function startGame (names) {
  players.value[0].name = names[0]
  players.value[1].name = names[1]
  gameStarted.value = true
}
</script>

<style scoped>
.app {
  text-align: center;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.turn-indicator {
  font-size: 1.1rem;
  margin: 1rem 0;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.3s;
}

.turn-indicator.player-x { border-color: #667eea; }
.turn-indicator.player-o { border-color: #f093fb; }

.symbol {
  font-weight: 700;
  margin-left: 0.25rem;
}

.winner-message {
  color: #ffd700;
  font-size: 1.2rem;
  font-weight: 700;
}

.draw-message {
  color: #a0aec0;
  font-size: 1.2rem;
}

.move-counter {
  font-size: 0.85rem;
  color: #718096;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.1s, opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #eee;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
