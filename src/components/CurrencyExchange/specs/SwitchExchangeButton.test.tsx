import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import SwitchExchangeCurrencies from '../SwitchExchangeCurrencies'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'
import { StoreState, SWITCH_EXCHANGE_CURRENCIES } from '../../../store/types'

describe('Switch Exchange Button', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render the component with no errors`, () => {
    const { wrapper } = mountWithStore(<SwitchExchangeCurrencies />, state)
    expect(wrapper.find('SwitchExchangeCurrencies')).toHaveLength(1)
  })

  it(`should dispatch an action to switch exchange currencies when clicked on`, () => {
    const { store, wrapper } = mountWithStore(<SwitchExchangeCurrencies />, state)
    wrapper.simulate('click')
    expect(store.getActions()).toEqual([{ type: SWITCH_EXCHANGE_CURRENCIES }])
  })
})