import {call, put, takeEvery} from "@redux-saga/core/effects";
import {showAlert} from "../actions";

function* sagaWatcher() {
    yield takeEvery('REQUEST_POST', sagaWorker);
}

function* sagaWorker() {
    try {
        const payload = yield call(fetchPost);
        yield put({ type: 'FETCH_POST', payload});
    } catch (e) {
        yield put(showAlert('Ошибка сервера :('));
    }
}

const fetchPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    return await response.json();
}


export default sagaWatcher