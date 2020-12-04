const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    taskName: action.taskName,
                    description: action.description,
                    date: action.date,
                    status: false
                }
            ]
        case 'EDIT_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? {
                        ...todo,
                        taskName: action.taskName,
                        description: action.description
                    }
                    : todo
            )
        case 'TOGGLE_TODO':
            return state.map(todo =>
                (todo.id === action.id)
                    ? {...todo, status: !todo.status}
                    : todo
            )
        case 'DELETE_TODO':
            return state.filter(todo => (todo.id !== action.id))
        default:
            return state
    }
}

export default todos
