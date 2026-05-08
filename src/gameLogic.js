/**
 * Shared game logic used by both App.vue and the unit tests.
 */

export const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

/**
 * @param {Array<string|null>} board - 9-element array
 * @returns {{ winner: string, cells: number[] } | null}
 */
export function checkWinner (board) {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], cells: [a, b, c] }
    }
  }
  return null
}

/**
 * @param {Array<string|null>} board
 * @returns {boolean}
 */
export function isBoardFull (board) {
  return board.every(cell => cell !== null)
}
