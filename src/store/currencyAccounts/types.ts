import { CurrencyId } from "../shared/types";

export const SELECT_CURRENCY_ACCOUNT = 'SELECT_CURRENCY_ACCOUNT';
export const SET_CURRENCY_ACCOUNT_BALANCE = 'SET_CURRENCY_ACCOUNT_BALANCE';

export interface SelectCurrencyAccountAction {
    type: typeof SELECT_CURRENCY_ACCOUNT,
    currency: CurrencyId
}

export interface SetCurrencyAccountBalanceAction {
    type: typeof SET_CURRENCY_ACCOUNT_BALANCE,
    currency: CurrencyId,
    balance: Number
}

export type CurrencyAccountActionTypes = SelectCurrencyAccountAction | SetCurrencyAccountBalanceAction;