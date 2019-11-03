import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { Currency } from '../../shared/types'
import { setExchangeFromCurrency, setExchangeToCurrency, fetchExchangeRatesFailure, fetchExchangeRatesRequest, fetchExchangeRatesSuccess, fetchExchangeRates, EXCHANGE_RATES_URL, FETCH_FAILURE_MESSAGE } from '../actions'
import { SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FETCH_CURRENCY_RATES_FAILURE, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, ExchangeRates, OpenExchangeRatesResponse } from '../types'
import { type } from 'os'
import { startFetchExchangeRatesInterval } from '../../index'
import { CurrencyExchangeActionTypes } from '../../types'

describe('actions', () => {
  it(
    'should create an action to set exchange-from currency',
    () => {
      const currency = 'GBP'
      const expectedAction = {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency
      }
      expect(setExchangeFromCurrency(currency)).toEqual(expectedAction)
    }
  )

  it(
    'should create an action to set exchange-to currency',
    () => {
      const currency = 'MAD'
      const expectedAction = {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
      }
      expect(setExchangeToCurrency(currency)).toEqual(expectedAction)
    }
  )
})

describe('fetch exchange currency rates actions', () => {
  it(
    'should create an action to notify of fetch currency rates error',
    () => {
      const errorMessage = 'Oh, this was bad.'
      const expectedAction = {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
      }
      expect(fetchExchangeRatesFailure(errorMessage)).toEqual(expectedAction)
    }
  )

  it(
    'should create an action to fetch currency rates',
    () => {
      const expectedAction = { type: FETCH_CURRENCY_RATES_REQUEST }
      expect(fetchExchangeRatesRequest()).toEqual(expectedAction)
    }
  )

  it(
    'should create an action to notify of fetch currency succesful response',
    () => {
      const baseExchangeCurrency = "USD"
      const exchangeRates = {
        "PLN": 1.2,
        "EUR": 4.11,
      }
      const expectedAction = {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency: baseExchangeCurrency,
        exchangeRates
      }
      expect(fetchExchangeRatesSuccess(baseExchangeCurrency, exchangeRates)).toEqual(expectedAction)
    }
  )
})

describe('Async fetch exchange rates chain of actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterEach(() => {
    fetchMock.restore()
  })

  function getDefaultMockResponseBody(): OpenExchangeRatesResponse {
    return {
      base: "USD",
      rates: {
        "PLN": 1.2,
        "GBP": 32.1,
        "EUR": 12431234.222222
      }
    }
  }

  it('successful response', () => {
    const mockResponseBody: OpenExchangeRatesResponse = getDefaultMockResponseBody()
    fetchMock.getOnce(EXCHANGE_RATES_URL, { body: mockResponseBody })

    const expectedActions = [
      { type: FETCH_CURRENCY_RATES_REQUEST },
      {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency: mockResponseBody.base,
        exchangeRates: mockResponseBody.rates
      }
    ]

    const store = mockStore({})
    store.dispatch(fetchExchangeRates()).then(
      () => expect(store.getActions()).toEqual(expectedActions)
    )
  })

  it('on fetch failure', () => {
    fetchMock.getOnce(
      EXCHANGE_RATES_URL,
      { status: 500 }
    )

    const expectedActions = [
      { type: FETCH_CURRENCY_RATES_REQUEST },
      {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage: FETCH_FAILURE_MESSAGE
      }
    ]
    const store = mockStore({
      baseExchangeCurrency: "EUR",
      exchangeRates: {}
    })

    store.dispatch(fetchExchangeRates()).then(
      () => expect(true).toBeFalsy(), // Fail the test - we expect the promise to be rejected.
      () => expect(store.getActions()).toEqual(expectedActions),
    )
  })

  it(`Test interval exchange rates fetching. First expect the fetch to happen 
  immediately after dispatching an action to start fetch interval. Then run 
  the interval twice and validate the store actions after each interval.`, () => {
      jest.useFakeTimers()
      return new Promise((resolveTest, rejectTest) => {
        const store = mockStore({})
        const mockResponseBody: OpenExchangeRatesResponse = getDefaultMockResponseBody()
        let dispatchFetchCalls = 0
        fetchMock.get(EXCHANGE_RATES_URL, { body: mockResponseBody })

        const successfulFetchActions: CurrencyExchangeActionTypes[] = [
          { type: FETCH_CURRENCY_RATES_REQUEST },
          {
            type: FETCH_CURRENCY_RATES_SUCCESS,
            baseCurrency: mockResponseBody.base,
            exchangeRates: mockResponseBody.rates
          }
        ]

        const validateStoreActions = () => {
          let expectedActions: CurrencyExchangeActionTypes[] = []
          for (let i = 0; i < dispatchFetchCalls; i++) {
            expectedActions = expectedActions.concat(successfulFetchActions)
          }
          expect(store.getActions()).toEqual(expectedActions)
        }

        const onDispatchFetchFinished = () => {
          dispatchFetchCalls++
          if (dispatchFetchCalls <= 2) {
            validateStoreActions()
            jest.runOnlyPendingTimers()
          } else if (dispatchFetchCalls === 3) {
            validateStoreActions()
            resolveTest()
          } else {
            expect(dispatchFetchCalls).toBeGreaterThan(0)
            expect(dispatchFetchCalls).toBeLessThan(4)
            rejectTest()
          }
        }

        const onFetchDispatchCallback = (fetchPromise: Promise<void>) =>
          fetchPromise.then(onDispatchFetchFinished)

        store.dispatch(startFetchExchangeRatesInterval(onFetchDispatchCallback))
      })
    })
})