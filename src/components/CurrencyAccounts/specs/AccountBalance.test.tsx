import React from 'react';
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import AccountBalance from '../AccountBalance'
import { StoreState } from '../../../store/types';
import { getDefaultStoreState } from '../../testUtils/testUtils';

const mockStore = configureMockStore([thunk]);

describe('Account Balance', () => {
  it(`should render account balance component displaying 
  balance of the currently selected currency account`, () => {
      const state: StoreState = getDefaultStoreState()
      const store = mockStore(state)
      const wrapper = mount(
        <Provider store={store}>
          <AccountBalance />
        </Provider>
      )
      const expectedText = 'PLN 44.44';
      expect(wrapper.find('AccountBalance').length).toEqual(1)
      expect(wrapper.text()).toEqual(expectedText)
    }
  )


  it(`should render account balance component displaying 
  balance of 0 for the currently selected currency account 
  if its balance is not defined in the store`, () => {
      const state: StoreState = getDefaultStoreState()
      state.currencyAccounts.selectedCurrencyAccount = "GEL";
      const store = mockStore(state)
      const wrapper = mount(
        <Provider store={store}>
          <AccountBalance />
        </Provider>
      )
      const expectedText = 'GEL 0.00';
      expect(wrapper.find('AccountBalance').length).toEqual(1)
      expect(wrapper.text()).toEqual(expectedText)
    }
  )
})