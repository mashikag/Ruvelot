import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import AccountBalance from '../AccountBalance'
import { StoreState } from '../../../store/types'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'

describe('Account Balance Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render account balance component displaying 
  balance of the currently selected currency account`, () => {
    const { wrapper } = mountWithStore(<AccountBalance />, state)
    const expectedText = '44.44'
    expect(wrapper.find('span').length).toEqual(1)
    expect(wrapper.text()).toEqual(expectedText)
  })

  it(`should render account balance component displaying 
  balance of 0.00 for the currently selected currency account 
  if its balance is not defined in the store`, () => {
    state.currencyAccounts.selectedCurrencyAccount = "GEL"
    const { wrapper } = mountWithStore(<AccountBalance />, state)
    const expectedText = '0.00'
    expect(wrapper.find('span').length).toEqual(1)
    expect(wrapper.text()).toEqual(expectedText)
  })

  it(`should render account balance component displaying 
  balance amount rounde off to 2 decimal places even if 
  the amount contains more decimal digits`, () => {
    state.currencyAccounts.selectedCurrencyAccount = "GEL"
    state.currencyAccounts.currencyAccountBalances.GEL = 99.342234
    const { wrapper } = mountWithStore(<AccountBalance />, state)
    const expectedText = '99.34'
    expect(wrapper.find('span').length).toEqual(1)
    expect(wrapper.text()).toEqual(expectedText)
  })
})