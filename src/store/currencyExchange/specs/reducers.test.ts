import reducer from '../reducers'
import { CurrencyExchangeActionTypes, CurrencyExchangeState, FETCH_CURRENCY_RATES_FAILURE, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, ExchangeRates, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY } from '../types'
import { Currency } from '../../shared/types'

function getInitialCurrencyExchangeState(): CurrencyExchangeState {
  return {
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
}

function getDefaultCustomCurrencyExchangeState(): CurrencyExchangeState {
  return {
    ratesBaseCurrency: "USD",
    exchangeFromAmount: 30,
    exchangeToAmount: 30 / .9 * 4,
    exchangeFromCurrency: "EUR",
    exchangeToCurrency: "PLN",
    rates: {
      "EUR": 0.90,
      "GBP": 0.85,
      "PLN": 4
    },
    fetchExchangeRatesState: {
      isFetching: false
    }
  }
}

describe('currency exchange reducers', () => {
  it(`should return the initial state if state 
  undefined and action not declared`, () => {
      // @ts-ignore - passed in action arg is of incorrect type which could possibly happen in runtime
      expect(reducer(undefined, {})).toEqual(getInitialCurrencyExchangeState())
    }
  )

  it('should return the input state if action not declared', () => {
    const stateIn = getDefaultCustomCurrencyExchangeState()
    // @ts-ignore
    const action: CurrencyAccountActionTypes = {}
    const stateOut = reducer(stateIn, action)
    expect(stateOut).not.toBe(stateIn)
    expect(stateOut).toEqual(stateIn)
  })

  it(`should set isFetching to false and set fetching error 
  message on failure to fetch exchange rates`, () => {
      const stateIn = {
        ...getDefaultCustomCurrencyExchangeState(),
        fetchExchangeRatesState: { isFetching: true }
      }

      const errorMessage = "Ops, my bad."
      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
      }

      const expectedStateOut = {
        ...stateIn,
        fetchExchangeRatesState: {
          isFetching: false,
          errorMessage
        }
      }

      const stateOut = reducer(stateIn, action)
      expect(stateOut).not.toBe(stateIn)
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState)
      expect(stateOut).toEqual(expectedStateOut)
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
      }

      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_REQUEST
      }

      const expectedStateOut = {
        ...stateIn,
        fetchExchangeRatesState: {
          isFetching: true
        }
      }

      const stateOut = reducer(stateIn, action)
      expect(stateOut).not.toBe(stateIn)
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState)
      expect(stateOut).toEqual(expectedStateOut)
    }
  )

  it(`should set isFetching to false and overwrite the exchange 
  rates on fetch exchange rates success`, () => {
      const stateIn = {
        ...getDefaultCustomCurrencyExchangeState(),
        fetchExchangeRatesState: { isFetching: true }
      }

      const ratesBaseCurrency: Currency = "MAD"
      const exchangeRates: ExchangeRates = {
        "EUR": 0.89,
        "GBP": 0.84,
        "PLN": 3.6
      }
      const action: CurrencyExchangeActionTypes = {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency: ratesBaseCurrency,
        exchangeRates
      }

      const expectedStateOut = {
        ...stateIn,
        ratesBaseCurrency,
        rates: exchangeRates,
        fetchExchangeRatesState: {
          isFetching: false
        }
      }

      const stateOut = reducer(stateIn, action)
      expect(stateOut).not.toBe(stateIn)
      expect(stateOut.fetchExchangeRatesState).not.toBe(stateIn.fetchExchangeRatesState)
      expect(stateOut).toEqual(expectedStateOut)
    }
  )

  it(`should return state with the exchange FROM currency set 
  to a different given currency and should recalculate the 
  exchange from amount`, () => {
      const stateIn = getDefaultCustomCurrencyExchangeState()
      const newExchangeToCurrency = "MAD"
      const newExchangeCurrencyRate = 4
      stateIn.rates[newExchangeToCurrency] = newExchangeCurrencyRate

      const action: CurrencyExchangeActionTypes = {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency: newExchangeToCurrency
      }

      const expectedStateOut = {
        ...stateIn,
        exchangeFromCurrency: newExchangeToCurrency,
        exchangeFromAmount: parseFloat((stateIn.exchangeFromAmount / .9 * newExchangeCurrencyRate).toFixed(2)),
      }

      const stateOut = reducer(stateIn, action)
      expect(stateOut).not.toBe(stateIn)
      expect(stateOut).toEqual(expectedStateOut)
    }
  )

  it(`should return state with the exchange TO currency set 
  to a different given currency and should recalculate the 
  exchange TO amount`, () => {
      const stateIn = getDefaultCustomCurrencyExchangeState()

      const currency: Currency = "GBP"
      const action: CurrencyExchangeActionTypes = {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
      }

      const expectedStateOut = {
        ...stateIn,
        exchangeToAmount: parseFloat((stateIn.exchangeToAmount / 4 * .85).toFixed(2)),
        exchangeToCurrency: currency
      }

      const stateOut = reducer(stateIn, action)
      expect(stateOut).not.toBe(stateIn)
      expect(stateOut).toEqual(expectedStateOut)
    }
  )
})