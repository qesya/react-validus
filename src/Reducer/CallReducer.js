export const CallReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.value]
    default:
      return state
  }
}
