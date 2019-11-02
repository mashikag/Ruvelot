import { Currency } from "../shared/types";

export const FETCH_CURRENCY_RATES = {
    REQUEST: 'FETCH_CURRENCY_RATES_REQUEST',
    SUCCESS: 'FETCH_CURRENCY_RATES_SUCCESS',
    FAILURE: 'FETCH_CURRENCY_RATES_FAILURE',
};
export const SET_EXCHANGE_FROM_CURRENCY = 'SET_EXCHANGE_FROM_CURRENCY';
export const SET_EXCHANGE_TO_CURRENCY = 'SET_EXCHANGE_TO_CURRENCY';

export interface FetchExchangeRatesState {
    isFetching: boolean,
    errorMessage?: String
}

export type ExchangeRates = {
    [K in Currency]?: Number
}

export interface FetchCurrencyRatesState {
    baseExchangeCurrency: Currency,
    exchangeRates: ExchangeRates,
    fetchExchangeRatesState: FetchExchangeRatesState
}

export interface FetchCurrencyRatesRequestAction {
    type: typeof FETCH_CURRENCY_RATES.REQUEST
}

export interface FetchCurrencyRatesResponseAction {
    type: typeof FETCH_CURRENCY_RATES.SUCCESS,
    exchangeRates: ExchangeRates,
    baseCurrency: Currency
}

export interface FetchCurrencyRatesErrorAction {
    type: typeof FETCH_CURRENCY_RATES.FAILURE,
    errorMessage: String
}

export interface SetExchangeFromCurrencyAction {
    type: typeof SET_EXCHANGE_FROM_CURRENCY,
    currency: Currency
}

export interface SetExchangeToCurrencyAction {
    type: typeof SET_EXCHANGE_TO_CURRENCY,
    currency: Currency
}

export type CurrencyExchangeActionTypes = SetExchangeFromCurrencyAction |
    SetExchangeToCurrencyAction | FetchCurrencyRatesErrorAction |
    FetchCurrencyRatesRequestAction | FetchCurrencyRatesResponseAction;