// Test utilities that are only meant to be used by component tests.
import { StoreState } from "../../store/types";

export function getDefaultStoreState(): StoreState {
  return {
    currencyAccounts: {
      selectedCurrencyAccount: "PLN",
      currencyAccountBalances: {
        "USD": 21.32,
        "PLN": 44.44
      }
    },
    currencyExchange: {
      ratesBaseCurrency: "USD",
      exchangeFromAmount: 0,
      exchangeToAmount: 0,
      exchangeFromCurrency: "PLN",
      exchangeToCurrency: "EUR",
      rates: {},
      fetchExchangeRatesState: { isFetching: false }
    }
  }
}