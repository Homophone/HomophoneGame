const initialState = {
  id: null,
  roundId: null
}

const currentGame = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CURRENT_GAME':
    return {
      ...initialState,
      id: action.payload
    }

  case 'CLEAR_CURRENT_GAME':
    return {
      ...initialState
    }

  case 'SET_CURRENT_ROUND':
    return {
      ...state,
      roundId: action.payload
    }

  default:
    return state
  }
}

export default currentGame
