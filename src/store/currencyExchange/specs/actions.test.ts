import { Currency } from '../../shared/types';
import { setExchangeFromCurrency, setExchangeToCurrency, fetchCurrencyRatesError, fetchCurrencyRatesRequest, fetchCurrencyRatesResponse } from '../actions';
import { FETCH_CURRENCY_RATES, SET_EXCHANGE_FROM_CURRENCY, SET_EXCHANGE_TO_CURRENCY } from '../types';

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
                type: FETCH_CURRENCY_RATES.FAILURE,
                errorMessage
            };
            expect(fetchCurrencyRatesError(errorMessage)).toEqual(expectedAction);
        }
    );

    it(
        'should create an action to fetch currency rates',
        () => {
            const expectedAction = { type: FETCH_CURRENCY_RATES.REQUEST };
            expect(fetchCurrencyRatesRequest()).toEqual(expectedAction);
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
                type: FETCH_CURRENCY_RATES.SUCCESS,
                baseCurrency: baseExchangeCurrency,
                exchangeRates
            };
            expect(fetchCurrencyRatesResponse(baseExchangeCurrency, exchangeRates)).toEqual(expectedAction);
        }
    );
})