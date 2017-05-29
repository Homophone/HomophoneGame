export const setCurrentGame = (id) => ({
  type: 'SET_CURRENT_GAME',
  payload: id
})

export const clearCurrentGame = () => ({
  type: 'CLEAR_CURRENT_GAME'
})
