import styles from './Conversation.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    changeFirstCurrencyValue,
    changeSecondCurrencyValue,
} from "../../redux/conversationReducer";
import {useState} from "react";

const Conversation = () => {
    const firstCurrencyValue = useSelector(state => state.conversation.firstCurrencyValue)
    const secondCurrencyValue = useSelector(state => state.conversation.secondCurrencyValue)

    const currencies = useSelector(state => state.conversation.currencies)

    const dispatch = useDispatch()
    const [firstSelectValue, setFirstSelectValue] = useState(1)
    const [secondSelectValue, setSecondSelectValue] = useState(1)

    const onChangeCurrencyValue = (e) => {
        if (e.target.id === 'firstInput') {
            //change first input value
            dispatch(changeFirstCurrencyValue(e.target.value))
            if (firstSelectValue === 1) {
                dispatch(changeSecondCurrencyValue(Math.round(e.target.value / secondSelectValue * 10000) / 10000))
            } else {
                dispatch(changeSecondCurrencyValue((Math.round((e.target.value / (secondSelectValue / firstSelectValue)) * 10000) / 10000)))
            }
        } else {
            //change second input value
            dispatch(changeSecondCurrencyValue(e.target.value))
            if (secondSelectValue === 1) {
                dispatch(changeFirstCurrencyValue(Math.round(e.target.value / firstSelectValue * 10000) / 10000))
            } else {
                dispatch(changeFirstCurrencyValue(Math.round((e.target.value / (firstSelectValue / secondSelectValue)) * 10000) / 10000))
            }
        }
    }
    const onChangeCurrency = (e) => {
        if (e.target.name === 'firstCurrency') {
            //change first currency
            setFirstSelectValue(Number(e.target.value))
            if (e.target.value === '1') {
                //if changing to UAH
                dispatch(changeFirstCurrencyValue(Math.round((secondCurrencyValue * secondSelectValue * 10000)) / 10000))
            } else {
                //if changing to NON-UAH
                if (secondSelectValue === 1) {
                    //if second select value is UAH
                    dispatch(changeFirstCurrencyValue(Math.round((secondCurrencyValue / (secondSelectValue * Number(e.target.value))) * 10000) / 10000))
                } else {
                    dispatch(changeFirstCurrencyValue(Math.round((secondCurrencyValue * (secondSelectValue / Number(e.target.value))) * 10000) / 10000))
                }
            }
        } else {
            //change second currency
            setSecondSelectValue(Number(e.target.value))
            if (e.target.value === '1') {
                //if changing to UAH
                dispatch(changeSecondCurrencyValue(Math.round((firstCurrencyValue * firstSelectValue * 10000)) / 10000))
            } else {
                //if changing to NON-UAH
                if (firstSelectValue === 1) {
                    //if first select value is UAH
                    dispatch(changeSecondCurrencyValue(Math.round((firstCurrencyValue / (firstSelectValue * Number(e.target.value))) * 10000) / 10000))
                } else {
                    dispatch(changeSecondCurrencyValue(Math.round((firstCurrencyValue * (firstSelectValue / Number(e.target.value))) * 10000) / 10000))
                }
            }
        }
    }
    return currencies.length ? <div className={styles.mainWrapper}>
            <div>
                <div>
                    <select name="firstCurrency" onChange={onChangeCurrency}>
                        {currencies.map((currency) => {
                            return <option key={currency.r030}
                                           value={currency.rate}>{currency.cc} {currency.txt} </option>
                        })}
                    </select>
                </div>
                <input type="number" id='firstInput' className={styles.input} value={firstCurrencyValue}
                       onChange={onChangeCurrencyValue}/>
            </div>
            <div>
                <div>
                    <select name="secondCurrency" onChange={onChangeCurrency}>
                        {currencies.map((currency) => {
                            return <option key={currency.r030}
                                           value={currency.rate}>{currency.cc} {currency.txt} </option>
                        })}
                    </select>
                </div>
                <input type="number" id='secondInput' className={styles.input} value={secondCurrencyValue}
                       onChange={onChangeCurrencyValue}/>
            </div>
        </div>
        : <div className={styles.error}>Something went wrong...Reload the page</div>
}
export default Conversation