import React from 'react'
import { shallow } from 'enzyme'
import CurrencyAccounts from '../CurrencyAccounts'

describe('Account Select Component', () => {
  it(`shallow snapshot`, () => {
    const component = shallow(<CurrencyAccounts />)
    expect(component).toMatchSnapshot()
  })
})