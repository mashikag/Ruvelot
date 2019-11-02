import { Currency } from "../shared/types";
import { CurrencyAccountsState, CurrencyAccountActionTypes, SELECT_CURRENCY_ACCOUNT, SET_CURRENCY_ACCOUNT_BALANCE } from "./types";

const initialState: CurrencyAccountsState = {
    selectedCurrencyAccount: "EUR",
    currencyAccountsBalance: {
        "EUR": 0
    }
};

export default function currencyAccounts(state = initialState, action: CurrencyAccountActionTypes): CurrencyAccountsState {
    switch (action.type) {
        case SELECT_CURRENCY_ACCOUNT:
            return {
                ...state,
                selectedCurrencyAccount: action.currency
            };
        case SET_CURRENCY_ACCOUNT_BALANCE:
            return {
                ...state,
                currencyAccountsBalance: {
                    ...state.currencyAccountsBalance,
                    [action.currency]: action.balance
                }
            };
        default:
            return { ...state };
    }
}