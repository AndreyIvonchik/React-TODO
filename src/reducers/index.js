import {combineReducers} from 'redux'
import todos from './todos'
import tables from "./tables";

export default combineReducers({
    todos,
    tables
})
