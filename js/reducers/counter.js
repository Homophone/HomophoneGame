const initialState = {
  value: 0
}

const counter = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        value: state.value + 1
      }

    case 'SUBTRACT':
      return {
        value: state.value - 1
      }

    default:
      return state
  }
}

export default counter
