export const addTodo = (id, taskName, description, date) => ({
    type: 'ADD_TODO',
    id: id,
    taskName: taskName,
    date: date,
    description: description
});

export const editTodo = (id, taskName, description) => ({
    type: 'EDIT_TODO',
    id: id,
    taskName: taskName,
    description: description
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

export const deleteTodo = id => ({
    type: 'DELETE_TODO',
    id
});

export const selectRow = id => ({
    type: 'SELECT_ROW',
    id
});
