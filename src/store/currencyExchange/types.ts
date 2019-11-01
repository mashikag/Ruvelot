import { CurrencyId } from "../shared/types";

export const SET_EXCHANGE_FROM_CURRENCY = 'SET_EXCHANGE_FROM_CURRENCY';
export const SET_EXCHANGE_TO_CURRENCY = 'SET_EXCHANGE_TO_CURRENCY';

export interface SetExchangeFromCurrencyAction {
    type: typeof SET_EXCHANGE_FROM_CURRENCY,
    currencyId: CurrencyId
}

export interface SetExchangeToCurrencyAction {
    type: typeof SET_EXCHANGE_TO_CURRENCY,
    currencyId: CurrencyId
}

export type CurrencyExchangeActionTypes = SetExchangeFromCurrencyAction | SetExchangeToCurrencyAction;