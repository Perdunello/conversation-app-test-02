import './App.css';
import Conversation from "./components/Conversation/Conversation";
import Header from "./components/Header/Header";
import {useEffect} from "react";
import {getCurrenciesRequest} from "./redux/conversationReducer";
import {useDispatch, useSelector} from "react-redux";
import Preloader from "./components/common/Preloader";

function App() {
    const dispatch = useDispatch()
    const currencies = useSelector(state => state.conversation.currencies)
    const fetchedData = useSelector(state => state.conversation.fetchedData)
    const mainCurrency = currencies.filter((currency) => {
        return currency.cc === 'USD' || currency.cc === 'EUR'
    })
    useEffect(() => {
        dispatch(getCurrenciesRequest())
    }, [])
    if (!fetchedData) {
        return (
            <div className='preloader'><Preloader/></div>
        )
    }
    return (
        <div className='app'>
            <Header mainCurrency={mainCurrency}/>
            <Conversation/>
            <div className='moving'>This site doesn`t contain buying and selling information, only national exchange
                rate against UAH

            </div>
        </div>
    );
}

export default App;
