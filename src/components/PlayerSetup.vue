<template>
  <div class="player-setup">
    <h2>Configurar Jugadores</h2>
    <div class="form">
      <div class="input-group">
        <label for="p1">Jugador X</label>
        <input
          id="p1"
          v-model="name1"
          type="text"
          placeholder="Nombre del Jugador X"
          maxlength="20"
          @keyup.enter="submit"
        >
      </div>
      <div class="input-group">
        <label for="p2">Jugador O</label>
        <input
          id="p2"
          v-model="name2"
          type="text"
          placeholder="Nombre del Jugador O"
          maxlength="20"
          @keyup.enter="submit"
        >
      </div>
      <button
        class="btn btn-primary"
        :disabled="!canStart"
        @click="submit"
      >
        ¡Empezar!
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  player1: { type: Object, required: true },
  player2: { type: Object, required: true }
})

const emit = defineEmits(['start'])

const name1 = ref(props.player1.name)
const name2 = ref(props.player2.name)

const canStart = computed(() => name1.value.trim().length > 0 && name2.value.trim().length > 0)

function submit () {
  if (!canStart.value) return
  emit('start', [name1.value.trim(), name2.value.trim()])
}
</script>

<style scoped>
.player-setup {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  max-width: 360px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  color: #a78bfa;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: left;
}

label {
  font-size: 0.9rem;
  color: #a0aec0;
  font-weight: 600;
}

input {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  color: #eee;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #667eea;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0.5rem;
  transition: transform 0.1s, opacity 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn:not(:disabled):hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
</style>
