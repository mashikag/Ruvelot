import { Currency } from "../shared/types";

export const SELECT_CURRENCY_ACCOUNT = 'SELECT_CURRENCY_ACCOUNT';
export const SET_CURRENCY_ACCOUNT_BALANCE = 'SET_CURRENCY_ACCOUNT_BALANCE';

export type CurrencyAccountsBalance = {
    [P in Currency]?: Number
}

export interface CurrencyAccountsState {
    selectedCurrencyAccount: Currency,
    currencyAccountsBalance: CurrencyAccountsBalance
}

export interface SelectCurrencyAccountAction {
    type: typeof SELECT_CURRENCY_ACCOUNT,
    currency: Currency
}

export interface SetCurrencyAccountBalanceAction {
    type: typeof SET_CURRENCY_ACCOUNT_BALANCE,
    currency: Currency,
    balance: Number
}

export type CurrencyAccountActionTypes = SelectCurrencyAccountAction | SetCurrencyAccountBalanceAction;