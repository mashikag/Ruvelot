import { CurrencyExchangeState, CurrencyExchangeActionTypes, FETCH_CURRENCY_RATES_FAILURE, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, SET_EXCHANGE_FROM_AMOUNT, SET_EXCHANGE_TO_AMOUNT } from './types'
import { calcExchangedAmount } from '../../utils/currencyExchangeUtils'

const initialState: CurrencyExchangeState = {
  ratesBaseCurrency: "USD",
  exchangeFromAmount: 0,
  exchangeToAmount: 0,
  exchangeFromCurrency: "EUR",
  exchangeToCurrency: "USD",
  rates: {},
  fetchExchangeRatesState: {
    isFetching: false
  }
}

export default function currencyExchange(
  state: CurrencyExchangeState = initialState,
  action: CurrencyExchangeActionTypes
): CurrencyExchangeState {
  switch (action.type) {
    case FETCH_CURRENCY_RATES_FAILURE:
      return {
        ...state,
        fetchExchangeRatesState: {
          isFetching: false,
          errorMessage: action.errorMessage
        }
      }
    case FETCH_CURRENCY_RATES_REQUEST:
      return {
        ...state,
        fetchExchangeRatesState: {
          isFetching: true
        }
      }
    case FETCH_CURRENCY_RATES_SUCCESS:
      return {
        ...state,
        ratesBaseCurrency: action.baseCurrency,
        rates: action.exchangeRates,
        fetchExchangeRatesState: {
          isFetching: false
        }
      }
    case SET_EXCHANGE_FROM_CURRENCY:
      return {
        ...state,
        exchangeFromAmount:
          calcExchangedAmount(
            state.exchangeFromAmount,
            state.exchangeFromCurrency,
            action.currency,
            state.rates,
            state.ratesBaseCurrency
          ),
        exchangeFromCurrency: action.currency
      }
    case SET_EXCHANGE_TO_CURRENCY:
      return {
        ...state,
        exchangeToAmount:
          calcExchangedAmount(
            state.exchangeToAmount,
            state.exchangeToCurrency,
            action.currency,
            state.rates,
            state.ratesBaseCurrency
          ),
        exchangeToCurrency: action.currency
      }
    case SET_EXCHANGE_FROM_AMOUNT:
      return {
        ...state,
        exchangeFromAmount: action.amount,
        exchangeToAmount:
          calcExchangedAmount(
            action.amount,
            state.exchangeFromCurrency,
            state.exchangeToCurrency,
            state.rates,
            state.ratesBaseCurrency
          )
      }
    case SET_EXCHANGE_TO_AMOUNT:
      return {
        ...state,
        exchangeFromAmount:
          calcExchangedAmount(
            action.amount,
            state.exchangeToCurrency,
            state.exchangeFromCurrency,
            state.rates,
            state.ratesBaseCurrency
          ),
        exchangeToAmount: action.amount
      }
    default:
      return { ...state }
  }
}