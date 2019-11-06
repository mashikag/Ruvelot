import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import AccountSelect from '../AccountSelect'
import { StoreState, Currency } from '../../../store/types'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'

describe('Account Select Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render account select component displaying 
  the correct number of options with the correct values`, () => {
    const currencies: Currency[] = ['GBP', 'PLN', 'EUR', 'MAD']
    state.currencyAccounts.currencyAccountBalances = {}
    currencies.forEach(
      (currency, index) =>
        state.currencyAccounts.currencyAccountBalances[currency] = index
    )

    const { wrapper } = mountWithStore(<AccountSelect />, state)
    expect(wrapper.find('AccountSelect')).toHaveLength(1)
    validateOptions(wrapper.find('option'), currencies)
  })
})

function validateOptions(options, currencies) {
  expect(options).toHaveLength(options.length)
  currencies.forEach(
    (currency, index) =>
      validateOptionElement(options.get(index), currency)
  )
}

function validateOptionElement(option, currency: Currency): void {
  expect(option.key).toEqual(currency)
  expect(option.props.children).toEqual(currency)
  expect(option.props.value).toEqual(currency)
}