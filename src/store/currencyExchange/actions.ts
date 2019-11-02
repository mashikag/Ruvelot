import { Currency } from "../shared/types";
import { CurrencyExchangeActionTypes, ExchangeRates, FETCH_CURRENCY_RATES, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY } from "./types";

export function fetchCurrencyRatesRequest(): CurrencyExchangeActionTypes {
    return { type: FETCH_CURRENCY_RATES.REQUEST };
}

export function fetchCurrencyRatesResponse(baseCurrency: Currency, exchangeRates: ExchangeRates): CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES.SUCCESS,
        baseCurrency,
        exchangeRates
    };
}

export function fetchCurrencyRatesError(errorMessage: String): CurrencyExchangeActionTypes {
    return {
        type: FETCH_CURRENCY_RATES.FAILURE,
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