const initialState = {
  id: null
}

const currentGame = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CURRENT_GAME':
    return {
      id: action.payload
    }

  case 'CLEAR_CURRENT_GAME':
    return {
      id: null
    }

  default:
    return state
  }
}

export default currentGame
