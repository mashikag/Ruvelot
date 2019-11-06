import React from 'react'
import { shallow } from 'enzyme'
import CurrencyExchange from '../CurrencyExchange'

describe('Currency Exchange Component', () => {
  it(`shallow snapshot`, () => {
    const component = shallow(<CurrencyExchange />)
    expect(component).toMatchSnapshot()
  })
})