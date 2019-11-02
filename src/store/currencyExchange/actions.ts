import { Currency } from "../shared/types";
import { CurrencyExchangeActionTypes, ExchangeRates, OpenExchangeRatesResponse, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, FETCH_CURRENCY_RATES_FAILURE } from "./types";
import { Dispatch } from "redux";
import { Promise, reject } from "q";

export const FETCH_FAILURE_MESSAGE = 'Error while fetching exchange rates.';
const EXCHANGE_RATES_APP_ID = '58b427febecf4f6d92bf8a92c5c94b61';
export const EXCHANGE_RATES_URL = `https://openexchangerates.org/api/latest.json?app_id=${EXCHANGE_RATES_APP_ID}`;

export function fetchExchangeRatesRequest(): CurrencyExchangeActionTypes {
    return { type: FETCH_CURRENCY_RATES_REQUEST };
}

export function fetchExchangeRatesSuccess(baseCurrency: Currency, exchangeRates: ExchangeRates): CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency,
        exchangeRates
    };
}

export function fetchExchangeRatesFailure(errorMessage: String): CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
    };
}

export function setExchangeFromCurrency(currency: Currency): CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency
    };
}

export function setExchangeToCurrency(currency: Currency): CurrencyExchangeActionTypes {
    return {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
    };
}

export function fetchExchangeRates() {
    return (dispatch: Dispatch) => {
        dispatch(fetchExchangeRatesRequest());

        const handleRawResponse = (response: Response) => {
            if (response.ok) {
                return response.json();
            } else {
                dispatch(fetchExchangeRatesFailure(FETCH_FAILURE_MESSAGE));
                return reject();
            }
        };

        const handleNetworkError = (err: Error) => {
            dispatch(fetchExchangeRatesFailure(err.toString()))
        };

        const handleJsonResponse = (json: OpenExchangeRatesResponse) => {
            dispatch(fetchExchangeRatesSuccess(json.base, json.rates));
        };

        return fetch(EXCHANGE_RATES_URL)
            .then(handleRawResponse, handleNetworkError)
            .then(handleJsonResponse, () => { });

    }
}