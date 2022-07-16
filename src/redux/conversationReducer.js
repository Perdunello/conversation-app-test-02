import {call, takeEvery, put} from 'redux-saga/effects'
import API from "../api/api";

const CHANGE_FIRST_CURRENCY_VALUE = 'CHANGE_FIRST_CURRENCY_VALUE'
const CHANGE_SECOND_CURRENCY_VALUE = 'CHANGE_SECOND_CURRENCY_VALUE'
const SET_CURRENCIES = 'SET_CURRENCIES'
const GET_CURRENCIES_REQUEST = 'GET_CURRENCIES_REQUEST'
const SET_FETCHED_DATA = 'SET_FETCHED_DATA'

const initialState = {
    firstCurrencyValue: 1,
    secondCurrencyValue: 1,
    currencies: [],
    fetchedData: false
}
const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FIRST_CURRENCY_VALUE:
            return {
                ...state,
                firstCurrencyValue: action.payload
            }
        case CHANGE_SECOND_CURRENCY_VALUE:
            return {
                ...state,
                secondCurrencyValue: action.payload
            }
        case SET_CURRENCIES:
            return {
                ...state,
                currencies: [{
                    r030: 20, txt: 'Українська гривня', rate: 1, cc: 'UAH', exchangedate: '18.07.2022'
                }, ...action.payload]
            }
        case SET_FETCHED_DATA:
            return {
                ...state,
                fetchedData: true
            }
        default:
            return state
    }
}

export const changeFirstCurrencyValue = (payload) => {
    return {type: CHANGE_FIRST_CURRENCY_VALUE, payload}
}
export const changeSecondCurrencyValue = (payload) => {
    return {type: CHANGE_SECOND_CURRENCY_VALUE, payload}
}
export const setCurrencies = (payload) => {
    return {type: SET_CURRENCIES, payload}
}
export const getCurrenciesRequest = () => {
    return {type: GET_CURRENCIES_REQUEST}
}
const setFetchedData = () => {
    return {type: SET_FETCHED_DATA}
}

function* getCurrencies() {
    const response = yield call(API.getCurrencies)
    if (response.status === 200) {
        yield put(setCurrencies(response.data))
        yield put(setFetchedData())
    }
}

export function* conversationWatcher() {
    yield takeEvery(GET_CURRENCIES_REQUEST, getCurrencies)
}

export default conversationReducer