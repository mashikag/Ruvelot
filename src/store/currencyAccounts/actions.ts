import { CurrencyAccountActionTypes, SELECT_CURRENCY_ACCOUNT, SET_CURRENCY_ACCOUNT_BALANCE } from './types';
import { Currency } from '../shared/types';

export function selectCurrencyAccount(currency: Currency): CurrencyAccountActionTypes {
    return {
        type: SELECT_CURRENCY_ACCOUNT,
        currency
    };
}

export function setCurrencyAccountBalance(balance: Number, currency: Currency): CurrencyAccountActionTypes {
    return {
        type: SET_CURRENCY_ACCOUNT_BALANCE,
        balance,
        currency
    };
}
