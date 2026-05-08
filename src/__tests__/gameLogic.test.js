import { describe, it, expect } from 'vitest'
import { checkWinner, isBoardFull } from '../gameLogic.js'

describe('checkWinner', () => {
  it('returns null for an empty board', () => {
    expect(checkWinner(Array(9).fill(null))).toBeNull()
  })

  it('detects a row win for X (top row)', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null]
    const result = checkWinner(board)
    expect(result).not.toBeNull()
    expect(result.winner).toBe('X')
    expect(result.cells).toEqual([0, 1, 2])
  })

  it('detects a row win for O (middle row)', () => {
    const board = [null, null, null, 'O', 'O', 'O', null, null, null]
    const result = checkWinner(board)
    expect(result).not.toBeNull()
    expect(result.winner).toBe('O')
    expect(result.cells).toEqual([3, 4, 5])
  })

  it('detects a column win for X (left column)', () => {
    const board = ['X', null, null, 'X', null, null, 'X', null, null]
    const result = checkWinner(board)
    expect(result).not.toBeNull()
    expect(result.winner).toBe('X')
    expect(result.cells).toEqual([0, 3, 6])
  })

  it('detects a diagonal win for O (top-left to bottom-right)', () => {
    const board = ['O', null, null, null, 'O', null, null, null, 'O']
    const result = checkWinner(board)
    expect(result).not.toBeNull()
    expect(result.winner).toBe('O')
    expect(result.cells).toEqual([0, 4, 8])
  })

  it('detects a diagonal win for X (top-right to bottom-left)', () => {
    const board = [null, null, 'X', null, 'X', null, 'X', null, null]
    const result = checkWinner(board)
    expect(result).not.toBeNull()
    expect(result.winner).toBe('X')
    expect(result.cells).toEqual([2, 4, 6])
  })

  it('returns null for a partial board without a winner', () => {
    const board = ['X', 'O', 'X', 'O', null, null, null, null, null]
    expect(checkWinner(board)).toBeNull()
  })

  it('does not falsely detect a win with mixed symbols in a row', () => {
    const board = ['X', 'O', 'X', null, null, null, null, null, null]
    expect(checkWinner(board)).toBeNull()
  })
})

describe('isBoardFull', () => {
  it('returns false for an empty board', () => {
    expect(isBoardFull(Array(9).fill(null))).toBe(false)
  })

  it('returns false for a partially filled board', () => {
    const board = ['X', 'O', null, null, null, null, null, null, null]
    expect(isBoardFull(board)).toBe(false)
  })

  it('returns true for a fully filled board', () => {
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(isBoardFull(board)).toBe(true)
  })

  it('returns true when all cells are filled even with a winner present', () => {
    const board = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O']
    expect(isBoardFull(board)).toBe(true)
  })
})

describe('draw detection', () => {
  it('identifies a draw: board full with no winner', () => {
    // X O X / X O O / O X X — no winner
    const board = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']
    expect(checkWinner(board)).toBeNull()
    expect(isBoardFull(board)).toBe(true)
  })

  it('is not a draw when board is full but has a winner', () => {
    // X X X / O O X / O X O — X wins top row
    const board = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O']
    expect(checkWinner(board)).not.toBeNull()
  })
})
