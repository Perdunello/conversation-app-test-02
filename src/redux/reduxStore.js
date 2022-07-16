import {applyMiddleware, combineReducers, createStore} from "redux";
import conversationReducer, {conversationWatcher} from "./conversationReducer";
import createSagaMiddleware from 'redux-saga'
import {all} from 'redux-saga/effects'

const reducers = combineReducers({
    conversation: conversationReducer
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(allWatchers)

function* allWatchers() {
    yield all([conversationWatcher()])
}

window.store = store
export default store