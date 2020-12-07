import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import React from 'react';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from 'redux'
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from "redux-devtools-extension";
import forbiddenMiddleware from "./middleware/middlewar";
import sagaWatcher from "./middleware/sagas";

const initialState = localStorage.getItem('todos') ? {
    todos: JSON.parse(localStorage.getItem('todos'))
} : {};

const saga = createSagaMiddleware();

const store = createStore(rootReducer, initialState, composeWithDevTools(
    applyMiddleware(thunk, forbiddenMiddleware, saga)
));

store.subscribe(() => {
    localStorage.setItem('todos', JSON.stringify(store.getState()?.todos))
});

saga.run(sagaWatcher);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
