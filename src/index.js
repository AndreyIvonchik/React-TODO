import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'

const persistedState = localStorage.getItem('todos') ? {
    todos: JSON.parse(localStorage.getItem('todos'))
} : {};

export const store = createStore(rootReducer, persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()?.todos))
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
