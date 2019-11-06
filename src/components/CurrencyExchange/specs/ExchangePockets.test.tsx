import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ExchangePockets from '../ExchangePockets'
import { StoreState, Currency, SET_EXCHANGE_FROM_AMOUNT, SET_EXCHANGE_TO_AMOUNT, SET_EXCHANGE_TO_CURRENCY, SET_EXCHANGE_FROM_CURRENCY } from '../../../store/types'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'

describe('Amountm Input Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render 2 exchange pockets with no errors`, () => {
    const { wrapper } = mountWithStore(<ExchangePockets />, state)
    expect(wrapper.find('ExchangePocket')).toHaveLength(2)
  })

  it(`change of amount in the first pocket should dispatch an action 
  to change the exchange-from-amount`, () => {
    const { store, wrapper } = mountWithStore(<ExchangePockets />, state)
    const exchangePockets = wrapper.find('ExchangePocket')
    const fromExchangePocket = exchangePockets.get(0)
    fromExchangePocket.props.onAmountChange(23)
    expect(store.getActions()).toEqual([{
      type: SET_EXCHANGE_FROM_AMOUNT,
      amount: 23
    }])
  })

  it(`change of amount in the second pocket should dispatch an action 
  to change the exchange-to-amount`, () => {
    const { store, wrapper } = mountWithStore(<ExchangePockets />, state)
    const exchangePockets = wrapper.find('ExchangePocket')
    const toExchangePocket = exchangePockets.get(1)
    toExchangePocket.props.onAmountChange(23)
    expect(store.getActions()).toEqual([{
      type: SET_EXCHANGE_TO_AMOUNT,
      amount: 23
    }])
  })

  it(`change in the selected currency of the first pocket should dispatch an 
  action to change the exchange-from-currency`, () => {
    const { store, wrapper } = mountWithStore(<ExchangePockets />, state)
    const exchangePockets = wrapper.find('ExchangePocket')
    const toExchangePocket = exchangePockets.get(0)
    toExchangePocket.props.onCurrencyChange('HTG')
    expect(store.getActions()).toEqual([{
      type: SET_EXCHANGE_FROM_CURRENCY,
      currency: 'HTG'
    }])
  })

  it(`change in the selected currency of the second pocket should dispatch an 
  action to change the exchange-to-currency`, () => {
    const { store, wrapper } = mountWithStore(<ExchangePockets />, state)
    const exchangePockets = wrapper.find('ExchangePocket')
    const toExchangePocket = exchangePockets.get(1)
    toExchangePocket.props.onCurrencyChange('HTG')
    expect(store.getActions()).toEqual([{
      type: SET_EXCHANGE_TO_CURRENCY,
      currency: 'HTG'
    }])
  })
})