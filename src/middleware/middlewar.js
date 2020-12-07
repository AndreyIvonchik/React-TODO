import {showAlert} from "../actions";


const forbiddenMiddleware = ({dispatch}) => {
    return (next) => {
        return (action) => {
            if(action.type === 'ADD_TODO' && action.taskName.length > 10) {

                return dispatch(showAlert('Слишком длинное название'));
            }

            return next(action);
        }
    }
}

export default  forbiddenMiddleware
