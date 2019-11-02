import { CurrencyExchangeState, CurrencyExchangeActionTypes, FETCH_CURRENCY_RATES_FAILURE, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FetchCurrencyRatesFailureAction, FetchCurrencyRatesSuccessAction, SetExchangeFromCurrencyAction, SetExchangeToCurrencyAction, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS } from './types';
import { CurrencyAccountActionTypes } from '../currencyAccounts/types';

const initialState: CurrencyExchangeState = {
  baseExchangeCurrency: "USD",
  exchangeFromCurrency: "EUR",
  exchangeToCurrency: "USD",
  exchangeRates: {},
  fetchExchangeRatesState: {
    isFetching: false
  }
}

export default function currencyExchange(state: CurrencyExchangeState = initialState, action: CurrencyExchangeActionTypes): CurrencyExchangeState {
  switch (action.type) {
    case FETCH_CURRENCY_RATES_FAILURE:
      return {
        ...state,
        fetchExchangeRatesState: {
          isFetching: false,
          errorMessage: action.errorMessage
        }
      };
    case FETCH_CURRENCY_RATES_REQUEST:
      return {
        ...state,
        fetchExchangeRatesState: {
          isFetching: true
        }
      };
    case FETCH_CURRENCY_RATES_SUCCESS:
      return {
        ...state,
        baseExchangeCurrency: action.baseCurrency,
        exchangeRates: action.exchangeRates,
        fetchExchangeRatesState: {
          isFetching: false
        }
      };
    case SET_EXCHANGE_FROM_CURRENCY:
      return {
        ...state,
        exchangeFromCurrency: action.currency
      };
    case SET_EXCHANGE_TO_CURRENCY: return {
      ...state,
      exchangeToCurrency: action.currency
    };
    default:
      return { ...state };
  }
}