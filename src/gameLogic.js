// Lógica del juego separada del componente para poder testearla fácilmente

// Las 8 combinaciones ganadoras del tres en raya (filas, columnas y diagonales)
export const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
  [0, 4, 8], [2, 4, 6]             // diagonales
]

// Comprueba si hay ganador en el tablero actual.
// Devuelve el símbolo ganador y las celdas que forman la línea, o null si no hay ganador todavía.
export function checkWinner (board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], cells: [a, b, c] }
    }
  }
  return null
}

// Devuelve true si todas las celdas están ocupadas (necesario para detectar empate)
export function isBoardFull (board) {
  return board.every(cell => cell !== null)
}
