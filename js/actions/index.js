let initialValue = 0
export const add = () => {
  return {
    type: 'ADD',
    value: initialValue++
  }
}

export const subtract = () => {
  return {
    type: 'SUBTRACT',
    value: initialValue--
  }
}
