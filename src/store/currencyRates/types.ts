export const FETCH_CURRENCY_RATES_REQUEST = 'FETCH_CURRENCY_RATES_REQUEST';
export const FETCH_CURRENCY_RATES_RESPONSE = 'FETCH_CURRENCY_RATES_RESPONSE';
export const FETCH_CURRENCY_RATES_ERROR = 'FETCH_CURRENCY_RATES_ERROR';

export interface FetchCurrencyRatesRequestAction {
    type: typeof FETCH_CURRENCY_RATES_REQUEST
}

export interface FetchCurrencyRatesResponseAction {
    type: typeof FETCH_CURRENCY_RATES_RESPONSE
}

export interface FetchCurrencyRatesErrorAction {
    type: typeof FETCH_CURRENCY_RATES_ERROR
}

export type FetchCurrencyRatesActionTypes = FetchCurrencyRatesErrorAction | FetchCurrencyRatesRequestAction | FetchCurrencyRatesResponseAction;