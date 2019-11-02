import { combineReducers } from "redux";
import currencyAccountsReducer from "./currencyAccounts/reducers";
import currencyExchangeReducer from "./currencyExchange/reducers";

export * from "./currencyAccounts/actions";
export * from "./currencyExchange/actions";

export const reducer = combineReducers(
  {
    currencyAccounts: currencyAccountsReducer,
    currencyExchange: currencyExchangeReducer
  }
);