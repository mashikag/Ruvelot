import { CurrencyAccountActionTypes, SELECT_CURRENCY_ACCOUNT, SET_CURRENCY_ACCOUNT_BALANCE } from './types';
import { CurrencyId } from '../shared/types';

export function selectCurrencyAccount(currency: CurrencyId): CurrencyAccountActionTypes {
    return {
        type: SELECT_CURRENCY_ACCOUNT,
        currency
    };
}

export function setCurrencyAccountBalance(balance: Number, currency: CurrencyId): CurrencyAccountActionTypes {
    return {
        type: SET_CURRENCY_ACCOUNT_BALANCE,
        balance,
        currency
    };
}
