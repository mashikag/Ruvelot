import { FETCH_CURRENCY_RATES_ERROR, FETCH_CURRENCY_RATES_REQUEST, FETCH_CURRENCY_RATES_RESPONSE } from './types';

export function fetchCurrencyRatesRequest() {
    return { type: FETCH_CURRENCY_RATES_REQUEST };
}

export function fetchCurrencyRatesResponse() {
    return { type: FETCH_CURRENCY_RATES_RESPONSE };
}

export function fetchCurrencyRatesError() {
    return { type: FETCH_CURRENCY_RATES_ERROR };
}