// Test utilities that are only meant to be used by component tests.
import React, { ReactElement } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Provider } from 'react-redux'
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

export function createMountWithStore(mockStore: any):
  (component: ReactElement, state: any) => { wrapper: ReactWrapper, store: any } {

  return (component, state) => {
    const store = mockStore(state)
    const wrapper = mount(
      <Provider store={store}>
        {component}
      </Provider>
    )
    return { store, wrapper }
  }
}