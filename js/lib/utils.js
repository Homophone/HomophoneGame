import { debounce as lodashDebounce } from 'lodash'

const DEBOUNCE_WAIT = 500 // 500 milliseconds

export const debounce = (fn) => (
  lodashDebounce(fn, DEBOUNCE_WAIT, {
    leading: true,
    trailing: false
  })
)
