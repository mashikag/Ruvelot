import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import ExchangePocket from '../ExchangePocket'
import { StoreState, Currency } from '../../../store/types'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'

describe('Exchange Pocket Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render the exchange component with no errors`, () => {
    const { wrapper } = mountWithStore(
      <ExchangePocket
        amount={123}
        currency={'USD'}
        excludeCurrency={'EUR'}
        label={'This is label!'}
        onAmountChange={jest.fn()}
        onCurrencyChange={jest.fn()}
      />,
      state
    )
    expect(wrapper.find('ExchangePocket')).toHaveLength(1)
    expect(wrapper.find('select')).toHaveLength(1)
    expect(wrapper.find('input')).toHaveLength(1)
    expect(wrapper.text()).toContain('This is label!')
  })

  it(`should create the currency select passing an array of all the
  currencies except the only one specified in props`, () => {
    state.currencyExchange.rates = {}
    const currencies: Currency[] = ['USD', 'PLN', 'MAD', 'GBP', 'EUR', 'GEL']
    currencies.forEach(
      (currency, index) =>
        state.currencyExchange.rates[currency] = index
    )

    const selectCurrencies = mountWithStore(
      <ExchangePocket
        amount={123}
        currency={'USD'}
        excludeCurrency={'EUR'}
        label={'This is label!'}
        onAmountChange={jest.fn()}
        onCurrencyChange={jest.fn()}
      />,
      state
    ).wrapper.find('select')

    expect(selectCurrencies.props().children)
      .toHaveLength(currencies.length - 1)
  })

  it(`should create the currency select passing an array of all the
  currencies if the exclude currency is not present`, () => {
    state.currencyExchange.rates = {}
    const currencies: Currency[] = ['USD', 'PLN', 'MAD', 'GBP', 'EUR', 'GEL']
    currencies.forEach(
      (currency, index) =>
        state.currencyExchange.rates[currency] = index
    )

    const selectCurrencies = mountWithStore(
      <ExchangePocket
        amount={123}
        currency={'USD'}
        excludeCurrency={'HTG'}
        label={'This is label!'}
        onAmountChange={jest.fn()}
        onCurrencyChange={jest.fn()}
      />,
      state
    ).wrapper.find('select')

    expect(selectCurrencies.props().children)
      .toHaveLength(currencies.length)
  })

})