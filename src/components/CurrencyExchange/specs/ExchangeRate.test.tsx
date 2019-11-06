import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ExchangeRate from '../ExchangeRate'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'
import { StoreState } from '../../../store/types'

describe('Amountm Input Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render the component with no errors`, () => {
    const { wrapper } = mountWithStore(<ExchangeRate />, state)
    expect(wrapper.find('ExchangeRate')).toHaveLength(1)
  })

  it(`should render the component with no errors`, () => {
    state.currencyExchange.exchangeFromCurrency = 'USD'
    state.currencyExchange.exchangeToCurrency = 'GBP'
    state.currencyExchange.rates = { 'USD': 10, 'GBP': 5 }
    const { wrapper } = mountWithStore(<ExchangeRate />, state)
    expect(wrapper.text()).toEqual('1 USD = 0.5 GBP')
  })
})