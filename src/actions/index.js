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

export const fetchPosts = () => {
    return  {
        type: 'REQUEST_POST'
    }
    // return async dispatch => {
    //     try {
    //         const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    //         const json = await response.json();
    //         dispatch({type: 'FETCH_POST', payload: json});
    //     } catch (e) {
    //         dispatch(showAlert('Ошибка сервера :('));
    //     }
    // }

};

export const showAlert = text => (
    (dispatch) => {
        dispatch({
            type: 'SHOW_ALERT',
            errorText: text
        });
        setTimeout(() => {
            dispatch(showAlert());
        }, 5000);
    });

export const hideAlert = () => ({
    type: 'HIDE_ALERT'
});