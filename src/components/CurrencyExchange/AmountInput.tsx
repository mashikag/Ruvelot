import React, { ChangeEvent, KeyboardEvent, ReactElement, useCallback } from 'react'
import styled from 'styled-components'
import { safeAmount } from '../../utils/currencyExchangeUtils'

export interface ExchangeAmountInputProps {
  amount: number | null
  onChange: (amount: number | null) => void
}

function AmountInput(
  { amount, onChange }: ExchangeAmountInputProps
): ReactElement {

  const safeOnAmountChange =
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.value === '') {
        onChange(null)
      } else {
        onChange(safeAmount(target.value))
      }
    }

  const safeOnAmountChangeCallback = useCallback(
    safeOnAmountChange,
    [onChange]
  )

  return <StyledAmountInput
    onChange={safeOnAmountChangeCallback}
    onKeyPressCapture={preventNotSupportedKeys}
    min={0}
    max={99999999}
    step='0.01'
    type='number'
    value={amount === null ? '' : safeAmount(amount)}
  />
}

export default AmountInput

const StyledAmountInput =
  styled.input({
    display: 'block',
    fontSize: '3em',
    width: '100%',
    textAlign: 'right',
    border: 'none',
    ':invalid': {
      color: '#be0000'
    }
  })

const otherSupportedAmountInputKey = {
  backspace: 8,
  fullStop: 46,
}

function preventNotSupportedKeys(evt: KeyboardEvent<HTMLInputElement>): void {
  const keyCode = (evt.which) ? evt.which : evt.keyCode
  if (!isKeyCodeSupported(keyCode)) {
    evt.stopPropagation()
    evt.preventDefault()
  }
}

function isDigitKeyCode(keyCode: number) {
  return keyCode >= 48 && keyCode <= 57
}

function isKeyCodeSupported(keyCode: number): boolean {
  if (isDigitKeyCode(keyCode)) {
    return true
  }
  return Object.values(otherSupportedAmountInputKey).includes(keyCode)
}