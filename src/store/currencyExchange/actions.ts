import { Currency } from "../shared/types"
import { CurrencyExchangeActionTypes, ExchangeRates, SET_EXCHANGE_FROM_AMOUNT, SET_EXCHANGE_TO_AMOUNT, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, FETCH_CURRENCY_RATES_FAILURE, SWITCH_EXCHANGE_CURRENCIES } from "./types"
import { AnyAction } from "redux"
import { reject } from "q"
import { ThunkDispatch, ThunkAction } from "redux-thunk"

const FETCH_EXCHANGE_RATES_INTERVAL_MS = 60 * 60 * 1000
const EXCHANGE_RATES_APP_ID = '58b427febecf4f6d92bf8a92c5c94b61'
export const FETCH_FAILURE_MESSAGE = 'Error while fetching exchange rates.'
export const EXCHANGE_RATES_URL = `https://openexchangerates.org/api/latest.json?app_id=${EXCHANGE_RATES_APP_ID}`

let fetchExchangeRatesIntervalTimer: number

export function fetchExchangeRatesRequest():
    CurrencyExchangeActionTypes {
    return { type: FETCH_CURRENCY_RATES_REQUEST }
}

export function fetchExchangeRatesSuccess(
    baseCurrency: Currency, exchangeRates: ExchangeRates
): CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency,
        exchangeRates
    }
}

export function fetchExchangeRatesFailure(errorMessage: String):
    CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
    }
}

export function setExchangeFromCurrency(currency: Currency):
    CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency
    }
}

export function setExchangeFromAmount(amount: number | null):
    CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_FROM_AMOUNT,
        amount
    }
}

export function setExchangeToAmount(amount: number | null):
    CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_TO_AMOUNT,
        amount
    }
}

export function setExchangeToCurrency(currency: Currency):
    CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
    }
}

export function swtichExchangeCurrencies():
    CurrencyExchangeActionTypes {
    return { type: SWITCH_EXCHANGE_CURRENCIES }
}

export function fetchExchangeRates():
    ThunkAction<Promise<void>, {}, {}, AnyAction> {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const handleRawResponse = (response: Response) => {
            if (response.ok) {
                return response.json()
            } else {
                dispatch(fetchExchangeRatesFailure(FETCH_FAILURE_MESSAGE))
                return reject()
            }
        }

        const handleNetworkError = (err: Error) => {
            dispatch(fetchExchangeRatesFailure(err.toString()))
        }

        const handleJsonResponse = (json: any) => {
            dispatch(fetchExchangeRatesSuccess(json.base, json.rates))
        }

        dispatch(fetchExchangeRatesRequest())
        return fetch(EXCHANGE_RATES_URL)
            .then(handleRawResponse, handleNetworkError)
            .then(handleJsonResponse)
    }
}

export function startFetchExchangeRatesInterval(
    callback?: (fetchDispatchPromise: Promise<void>) => void
): ThunkAction<Number, {}, {}, AnyAction> {

    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const dispatchFetchExchangeRates = () => {
            const fetchPromise = dispatch(fetchExchangeRates())
            callback && callback(fetchPromise)
        }

        clearInterval(fetchExchangeRatesIntervalTimer)
        dispatchFetchExchangeRates()
        return fetchExchangeRatesIntervalTimer = setInterval(
            dispatchFetchExchangeRates,
            FETCH_EXCHANGE_RATES_INTERVAL_MS
        )
    }
}