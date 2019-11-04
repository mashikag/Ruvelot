import { CurrencyAccountsState, CurrencyAccountActionTypes, SELECT_CURRENCY_ACCOUNT, SET_CURRENCY_ACCOUNT_BALANCE } from "./types"

const initialState: CurrencyAccountsState = {
  selectedCurrencyAccount: "EUR",
  currencyAccountBalances: { "EUR": 1000 }
}

export default function currencyAccounts(state = initialState, action: CurrencyAccountActionTypes):
  CurrencyAccountsState {
  switch (action.type) {
    case SELECT_CURRENCY_ACCOUNT:
      return {
        ...state,
        selectedCurrencyAccount: action.currency
      }
    case SET_CURRENCY_ACCOUNT_BALANCE:
      return {
        ...state,
        currencyAccountBalances: {
          ...state.currencyAccountBalances,
          [action.currency]: action.balance
        }
      }
    default:
      return { ...state }
  }
}