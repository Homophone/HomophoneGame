const counter = (state = {}, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        value: action.value
      }

    case 'SUBTRACT':
      return {
        value: action.value
      }

    default:
      return state
  }
}

export default counter
