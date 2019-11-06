import React, { ReactElement, SelectHTMLAttributes, ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { Currency } from '../../store/types'

export interface CurrencySelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  currencies: Currency[]
  onCurrencyChange: (value: Currency) => void
}

function CurrencySelectComponent(
  { currencies, onCurrencyChange, ...otherProps }: CurrencySelectProps
): ReactElement {

  const onChangeEvent = useCallback(
    ({ target }: ChangeEvent<HTMLSelectElement>) =>
      onCurrencyChange(target.value as Currency),
    [onCurrencyChange]
  )

  return (
    <CurrencySelect disabled={currencies.length <= 1} onChange={onChangeEvent} {...otherProps}>
      {createCurrencySelectOptions(currencies)}
    </CurrencySelect>
  )
}

export default CurrencySelectComponent

const CurrencySelect =
  styled.select({
    display: 'block',
    flex: 'auto',
    fontSize: '2em',
    backgroundColor: 'transparent',
    border: 'none',
    margin: '2px',
    ":disabled": {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      'text-indent': '1px',
      'text-overflow': '',
      color: 'initial'
    }
  })

function createCurrencySelectOptions(
  currencies: Currency[],
  excludeCurrency?: Currency
): JSX.Element[] {
  return currencies.map(
    currency =>
      <option key={currency} value={currency}>
        {currency}
      </option>
  )
}
