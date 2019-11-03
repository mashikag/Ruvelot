import { CurrencyAccountsState } from "./currencyAccounts/types";
import { CurrencyExchangeState } from "./currencyExchange/types";

export * from "./currencyAccounts/types"
export * from "./currencyExchange/types"
export * from "./shared/types"

export interface StoreState {
  currencyAccounts: CurrencyAccountsState
  currencyExchange: CurrencyExchangeState
}