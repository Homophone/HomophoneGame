export const setCurrentGame = (id) => ({
  type: 'SET_CURRENT_GAME',
  payload: id
})

export const clearCurrentGame = () => ({
  type: 'CLEAR_CURRENT_GAME'
})

export const setCurrentRound = (roundId) => ({
  type: 'SET_CURRENT_ROUND',
  payload: roundId
})
