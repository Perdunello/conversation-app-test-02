import axios from "axios";

const API = {
    getCurrencies() {
        return axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then(response => {
                return response
            })
    }
}
export default API