import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SubmitExchangeButton from '../SubmitExchangeButton'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'
import { StoreState, SET_CURRENCY_ACCOUNT_BALANCE } from '../../../store/types'

describe('Submit Exchange Button Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render the component with no errors`, () => {
    const { wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    expect(wrapper.find('SubmitExchangeButton')).toHaveLength(1)
  })

  it(`should be enabled when has enough balance in exchange-from-currency account`, () => {
    state.currencyAccounts.currencyAccountBalances = { 'USD': 300 }
    state.currencyExchange.exchangeFromAmount = 300
    state.currencyExchange.exchangeFromCurrency = 'USD'
    const { wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    expect(wrapper.find('button').props().disabled).toBeFalsy()
  })

  it(`should be disabled if the exchange-from-currency account 
  balance is undefined in store`, () => {
    state.currencyAccounts.currencyAccountBalances = {}
    state.currencyExchange.exchangeFromAmount = 300
    state.currencyExchange.exchangeFromCurrency = 'USD'
    const { wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    expect(wrapper.find('button').props().disabled).toBeTruthy()
  })

  it(`should be disabled if the exchange-from-amount is greater than the 
  cuurrency's account balance`, () => {
    state.currencyAccounts.currencyAccountBalances = {}
    state.currencyExchange.exchangeFromAmount = 301
    state.currencyExchange.exchangeFromCurrency = 'USD'
    const { wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    expect(wrapper.find('button').props().disabled).toBeTruthy()
  })

  it(`should be disabled if the exchange-from-currency account balance is 0`, () => {
    state.currencyAccounts.currencyAccountBalances = { 'USD': 0 }
    state.currencyExchange.exchangeFromAmount = 301
    state.currencyExchange.exchangeFromCurrency = 'USD'
    const { wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    expect(wrapper.find('button').props().disabled).toBeTruthy()
  })

  it(`onclick should dispatch 2 actions to update the balance 
  for the exchanging to and from currency accounts`, () => {
    state.currencyAccounts.currencyAccountBalances = { 'USD': 1000, 'EUR': 50 }
    state.currencyExchange.exchangeFromAmount = 301
    state.currencyExchange.exchangeFromCurrency = 'USD'
    state.currencyExchange.exchangeToAmount = 50
    state.currencyExchange.exchangeToCurrency = 'EUR'
    const { store, wrapper } = mountWithStore(<SubmitExchangeButton />, state)
    wrapper.simulate('click')
    expect(store.getActions()).toEqual([
      {
        type: SET_CURRENCY_ACCOUNT_BALANCE,
        balance: 699,
        currency: 'USD'
      },
      {
        type: SET_CURRENCY_ACCOUNT_BALANCE,
        balance: 100,
        currency: 'EUR'
      }
    ])
  })
})