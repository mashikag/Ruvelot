import { Currency } from "../shared/types";

export const FETCH_CURRENCY_RATES_FAILURE = 'FETCH_CURRENCY_RATES_FAILURE';
export const FETCH_CURRENCY_RATES_REQUEST = 'FETCH_CURRENCY_RATES_REQUEST';
export const FETCH_CURRENCY_RATES_SUCCESS = 'FETCH_CURRENCY_RATES_SUCCESS';

export const SET_EXCHANGE_FROM_CURRENCY = 'SET_EXCHANGE_FROM_CURRENCY';
export const SET_EXCHANGE_TO_CURRENCY = 'SET_EXCHANGE_TO_CURRENCY';

export interface CurrencyExchangeState {
  baseExchangeCurrency: Currency,
  exchangeFromCurrency: Currency,
  exchangeToCurrency: Currency,
  exchangeRates: ExchangeRates,
  fetchExchangeRatesState: FetchExchangeRatesState
}

export interface FetchExchangeRatesState {
  isFetching: boolean,
  errorMessage?: String
}

export interface FetchCurrencyRatesRequestAction {
  type: typeof FETCH_CURRENCY_RATES_REQUEST
}

export interface FetchCurrencyRatesSuccessAction {
  type: typeof FETCH_CURRENCY_RATES_SUCCESS,
  exchangeRates: ExchangeRates,
  baseCurrency: Currency
}

export interface FetchCurrencyRatesFailureAction {
  type: typeof FETCH_CURRENCY_RATES_FAILURE,
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

export interface OpenExchangeRatesResponse {
  base: Currency,
  rates: ExchangeRates
}

export type ExchangeRates = {
  [K in Currency]?: Number
}

export type CurrencyExchangeActionTypes = FetchCurrencyRatesFailureAction |
  FetchCurrencyRatesRequestAction | FetchCurrencyRatesSuccessAction |
  SetExchangeFromCurrencyAction | SetExchangeToCurrencyAction;