import React from 'react'
import { mount, shallow } from 'enzyme'
import CurrencySelect from '../CurrencySelect'
import { Currency } from '../../../store/types'

describe('Switch Exchange Button', () => {
  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'MAD', 'PLN', 'HTG']

  it(`should render the component with no errors and the correct 
  number of currency options`, () => {
    const wrapper = mount(
      <CurrencySelect
        currencies={currencies}
        onCurrencyChange={() => undefined} />
    )
    expect(wrapper.find('select')).toHaveLength(1)
    expect(wrapper.find('option')).toHaveLength(currencies.length)
  })

  it(`should the currency options with the expected content`, () => {
    const wrapper = mount(
      <CurrencySelect
        currencies={currencies}
        onCurrencyChange={() => undefined} />
    )
    const options = wrapper.find('option')
    options.forEach((option, index) => {
      expect(option.key()).toEqual(currencies[index])
      expect(option.props().value).toEqual(currencies[index])
      expect(option.props().children).toEqual(currencies[index])
    });
    expect(wrapper.find('option')).toHaveLength(currencies.length)
  })

  it(`should call the onCurrencyChange callback when new currency is selected`, () => {
    const onCurrencyChangeCallback = jest.fn()
    const wrapper = mount(
      <CurrencySelect
        currencies={currencies}
        onCurrencyChange={onCurrencyChangeCallback} />
    )
    wrapper.simulate('change', { target: { value: 'HTG' } })
    expect(onCurrencyChangeCallback).toBeCalledTimes(1)
  })
})