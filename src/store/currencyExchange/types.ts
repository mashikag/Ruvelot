import { Currency } from "../shared/types"

export const FETCH_CURRENCY_RATES_FAILURE = 'FETCH_CURRENCY_RATES_FAILURE'
export const FETCH_CURRENCY_RATES_REQUEST = 'FETCH_CURRENCY_RATES_REQUEST'
export const FETCH_CURRENCY_RATES_SUCCESS = 'FETCH_CURRENCY_RATES_SUCCESS'

export const SET_EXCHANGE_FROM_AMOUNT = 'SET_EXCHANGE_FROM_AMOUNT'
export const SET_EXCHANGE_TO_AMOUNT = 'SET_EXCHANGE_TO_AMOUNT'
export const SET_EXCHANGE_FROM_CURRENCY = 'SET_EXCHANGE_FROM_CURRENCY'
export const SET_EXCHANGE_TO_CURRENCY = 'SET_EXCHANGE_TO_CURRENCY'

export interface CurrencyExchangeState {
  exchangeFromAmount: number | null
  exchangeToAmount: number | null
  exchangeFromCurrency: Currency
  exchangeToCurrency: Currency
  rates: ExchangeRates
  ratesBaseCurrency: Currency
  fetchExchangeRatesState: FetchExchangeRatesState
}

export interface FetchExchangeRatesState {
  isFetching: boolean
  errorMessage?: String
}

export interface FetchCurrencyRatesRequestAction {
  type: typeof FETCH_CURRENCY_RATES_REQUEST
}

export interface FetchCurrencyRatesSuccessAction {
  type: typeof FETCH_CURRENCY_RATES_SUCCESS
  exchangeRates: ExchangeRates
  baseCurrency: Currency
}

export interface FetchCurrencyRatesFailureAction {
  type: typeof FETCH_CURRENCY_RATES_FAILURE
  errorMessage: String
}

export interface SetExchangeFromAmountAction {
  type: typeof SET_EXCHANGE_FROM_AMOUNT
  amount: number | null
}

export interface SetExchangeToAmountAction {
  type: typeof SET_EXCHANGE_TO_AMOUNT
  amount: number | null
}

export interface SetExchangeFromCurrencyAction {
  type: typeof SET_EXCHANGE_FROM_CURRENCY
  currency: Currency
}

export interface SetExchangeToCurrencyAction {
  type: typeof SET_EXCHANGE_TO_CURRENCY
  currency: Currency
}

export interface OpenExchangeRatesResponse {
  base: Currency
  rates: ExchangeRates
}

export type ExchangeRates = {
  [K in Currency]?: number
}

export type CurrencyExchangeActionTypes = FetchCurrencyRatesFailureAction |
  FetchCurrencyRatesRequestAction | FetchCurrencyRatesSuccessAction |
  SetExchangeFromAmountAction | SetExchangeToAmountAction |
  SetExchangeFromCurrencyAction | SetExchangeToCurrencyAction