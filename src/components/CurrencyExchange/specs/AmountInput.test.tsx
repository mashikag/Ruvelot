import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import AmountInput from '../AmountInput'
import { StoreState, Currency } from '../../../store/types'
import { getDefaultStoreState, createMountWithStore } from '../../testUtils/testUtils'

describe('Amountm Input Component', () => {
  const mockStore = configureMockStore([thunk])
  const mountWithStore = createMountWithStore(mockStore)

  let state: StoreState
  beforeEach(() => state = getDefaultStoreState())

  it(`should render an input element with the specified 
  amount displayed`, () => {
    const { wrapper } = mountWithStore(<AmountInput amount={31.23} onChange={jest.fn()} />, state)
    const input = wrapper.find('input')
    expect(input).toHaveLength(1)
    expect(input.props().value).toEqual(31.23)
  })

  it(`should call the onChange callback with the event 
  value parsed to number when the onchange event is triggered`, () => {
    const onChangeCallback = jest.fn()
    const { wrapper } = mountWithStore(<AmountInput amount={31.23} onChange={onChangeCallback} />, state)
    const event = { target: { value: '44.44' } };
    wrapper.simulate('change', event);
    wrapper.update(); // Force re-render
    expect(onChangeCallback).toBeCalledWith(44.44);
  })

  it(`should call the onChange callback with null when the onchange 
  event is triggered with an empty string as target.value`, () => {
    const onChangeCallback = jest.fn()
    const { wrapper } = mountWithStore(<AmountInput amount={31.23} onChange={onChangeCallback} />, state)
    const event = { target: { value: '' } };
    wrapper.simulate('change', event);
    wrapper.update(); // Force re-render
    expect(onChangeCallback).toBeCalledWith(null);
  })
})