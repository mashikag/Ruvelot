import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { Currency } from '../../shared/types';
import { setExchangeFromCurrency, setExchangeToCurrency, fetchExchangeRatesFailure, fetchExchangeRatesRequest, fetchExchangeRatesSuccess, fetchExchangeRates, EXCHANGE_RATES_URL, FETCH_FAILURE_MESSAGE } from '../actions';
import { SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY, FETCH_CURRENCY_RATES_FAILURE, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_SUCCESS, ExchangeRates, OpenExchangeRatesResponse } from '../types';
import { type } from 'os';

describe('actions', () => {
  it(
    'should create an action to set exchange-from currency',
    () => {
      const currency = 'GBP';
      const expectedAction = {
        type: SET_EXCHANGE_FROM_CURRENCY,
        currency
      };
      expect(setExchangeFromCurrency(currency)).toEqual(expectedAction);
    }
  );

  it(
    'should create an action to set exchange-to currency',
    () => {
      const currency = 'MAD';
      const expectedAction = {
        type: SET_EXCHANGE_TO_CURRENCY,
        currency
      };
      expect(setExchangeToCurrency(currency)).toEqual(expectedAction);
    }
  );
})

describe('fetch exchange currency rates actions', () => {
  it(
    'should create an action to notify of fetch currency rates error',
    () => {
      const errorMessage = 'Oh, this was bad.';
      const expectedAction = {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage
      };
      expect(fetchExchangeRatesFailure(errorMessage)).toEqual(expectedAction);
    }
  );

  it(
    'should create an action to fetch currency rates',
    () => {
      const expectedAction = { type: FETCH_CURRENCY_RATES_REQUEST };
      expect(fetchExchangeRatesRequest()).toEqual(expectedAction);
    }
  );

  it(
    'should create an action to notify of fetch currency succesful response',
    () => {
      const baseExchangeCurrency = "USD";
      const exchangeRates = {
        "PLN": 1.2,
        "EUR": 4.11,
      };
      const expectedAction = {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency: baseExchangeCurrency,
        exchangeRates
      };
      expect(fetchExchangeRatesSuccess(baseExchangeCurrency, exchangeRates)).toEqual(expectedAction);
    }
  );
})

describe('Async fetch exchange rates chain of actions', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterEach(() => {
    fetchMock.resetHistory()
    fetchMock.restore()
  })

  it('successful response', () => {
    const baseCurrency: Currency = "USD";
    const exchangeRates: ExchangeRates = {
      "PLN": 1.2,
      "GBP": 32.1,
      "EUR": 12431234.222222
    };

    const mockResponseBody: OpenExchangeRatesResponse = {
      base: baseCurrency,
      rates: exchangeRates
    };
    fetchMock.getOnce(
      EXCHANGE_RATES_URL,
      {
        body: mockResponseBody,
        headers: { 'content-type': 'application/json' }
      }
    );

    const expectedActions = [
      { type: FETCH_CURRENCY_RATES_REQUEST },
      {
        type: FETCH_CURRENCY_RATES_SUCCESS,
        baseCurrency,
        exchangeRates
      }
    ];
    const store = mockStore({
      baseExchangeCurrency: "EUR",
      exchangeRates: {}
    });

    return store.dispatch(fetchExchangeRates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });



  it('on fetch failure', () => {
    const baseCurrency: Currency = "USD";
    const exchangeRates: ExchangeRates = {
      "PLN": 1.2,
      "GBP": 32.1,
      "EUR": 12431234.222222
    };

    const mockResponseBody: OpenExchangeRatesResponse = {
      base: baseCurrency,
      rates: exchangeRates
    };
    fetchMock.mock(
      EXCHANGE_RATES_URL,
      { status: 500 }
    );

    const expectedActions = [
      { type: FETCH_CURRENCY_RATES_REQUEST },
      {
        type: FETCH_CURRENCY_RATES_FAILURE,
        errorMessage: FETCH_FAILURE_MESSAGE
      }
    ];
    const store = mockStore({
      baseExchangeCurrency: "EUR",
      exchangeRates: {}
    });

    return store.dispatch(fetchExchangeRates()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  })
})