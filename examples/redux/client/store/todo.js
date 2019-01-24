export default (state = {}, action) => {
  state = {
    tasks: ['default']
  }
  switch (action.type) {
    case 'todo/setTasks':
      return { ...state, tasks: action.infos }
    default:
      return state
  }
}
