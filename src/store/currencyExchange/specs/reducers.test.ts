import reducer from '../reducers';
import { CurrencyExchangeActionTypes, CurrencyExchangeState, FETCH_CURRENCY_RATES_FAILURE, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, ExchangeRates, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY } from '../types';
import { Currency } from '../../shared/types';

function getInitialCurrencyExchangeState(): CurrencyExchangeState {
  return {
    baseExchangeCurrency: "USD",
    exchangeFromCurrency: "EUR",
    exchangeToCurrency: "USD",
    exchangeRates: {},
    fetchExchangeRatesState: {
      isFetching: false
    }
  };
}

function getDefaultCustomCurrencyExchangeState(): CurrencyExchangeState {
  return {
    baseExchangeCurrency: "USD",
    exchangeFromCurrency: "EUR",
    exchangeToCurrency: "USD",
    exchangeRates: {
      "EUR": 0.90,
      "GBP": 0.85
    },
    fetchExchangeRatesState: {
      isFetching: false
    }
  };
}

describe('currency exchange reducers', () => {
  it(`should return the initial state if state 
        undefined and action not declared`, () => {
      // @ts-ignore - passed in action arg is of incorrect type which could possibly happen in runtime
      expect(reducer(undefined, {})).toEqual(getInitialCurrencyExchangeState())
    }
  )

  it('should return the input state if action not declared', () => {
    const stateIn = getDefaultCustomCurrencyExchangeState();
    // @ts-ignore
    const action: CurrencyAccountActionTypes = {};
    const stateOut = reducer(stateIn, action);
    expect(stateOut).not.toBe(stateIn)
    expect(stateOut).toEqual(stateIn)
  })

  it(`should set isFetching to false and set fetching error 
      message on failure to fetch exchange rates`, () => {
      const stateIn = {
        ...getDefaultCustomCurrencyExchangeState(),
        fetchExchangeRatesState: { isFetching: true }
      };

      const errorMessage = "Ops, my bad.";
      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
      };

      const expectedStateOut = {
        ...stateIn,
        fetchExchangeRatesState: {
          isFetching: false,
          errorMessage
        }
      };

      const stateOut = reducer(stateIn, action);
      expect(stateOut).not.toBe(stateIn);
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState);
      expect(stateOut).toEqual(expectedStateOut);
    }
  )

  it(`should set isFetching to true and clear fetching error 
      message on request to fetch exchange rates`, () => {
      const stateIn: CurrencyExchangeState = {
        ...getDefaultCustomCurrencyExchangeState(),
        fetchExchangeRatesState: {
          isFetching: false,
          errorMessage: "Ops, my bad."
        }
      };

      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_REQUEST
      };

      const expectedStateOut = {
        ...stateIn,
        fetchExchangeRatesState: {
          isFetching: true
        }
      };

      const stateOut = reducer(stateIn, action);
      expect(stateOut).not.toBe(stateIn);
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState);
      expect(stateOut).toEqual(expectedStateOut);
    }
  )

  it(`should set isFetching to false and overwrite the exchange 
      rates on fetch exchange rates success`, () => {
      const stateIn = {
        ...getDefaultCustomCurrencyExchangeState(),
        fetchExchangeRatesState: { isFetching: true }
      };

      const baseExchangeCurrency: Currency = "MAD";
      const exchangeRates: ExchangeRates = {
        "EUR": 0.89,
        "GBP": 0.84,
        "PLN": 3.6
      };
      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency: baseExchangeCurrency,
        exchangeRates
      };

      const expectedStateOut = {
        ...stateIn,
        baseExchangeCurrency,
        exchangeRates,
        fetchExchangeRatesState: {
          isFetching: false
        }
      };

      const stateOut = reducer(stateIn, action);
      expect(stateOut).not.toBe(stateIn);
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState);
      expect(stateOut).toEqual(expectedStateOut);
    }
  )

  it(`should return state with the exchange from currency set 
      to the given value`, () => {
      const stateIn = getDefaultCustomCurrencyExchangeState();

      const currency: Currency = "PLN";
      const action: CurrencyExchangeActionTypes = {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency
      };

      const expectedStateOut = {
        ...stateIn,
        exchangeFromCurrency: currency,
      };

      const stateOut = reducer(stateIn, action);
      expect(stateOut).not.toBe(stateIn);
      expect(stateOut).toEqual(expectedStateOut);
    }
  )

  it(`should return state with the exchange to currency set 
    to the given value`, () => {
      const stateIn = getDefaultCustomCurrencyExchangeState();

      const currency: Currency = "PLN";
      const action: CurrencyExchangeActionTypes = {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
      };

      const expectedStateOut = {
        ...stateIn,
        exchangeToCurrency: currency
      };

      const stateOut = reducer(stateIn, action);
      expect(stateOut).not.toBe(stateIn);
      expect(stateOut).toEqual(expectedStateOut);
    }
  )
})