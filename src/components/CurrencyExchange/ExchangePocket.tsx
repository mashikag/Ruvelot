import React, { ReactElement } from 'react'
import styled from 'styled-components'
import AmountInput from './AmountInput'
import CurrencySelect from '../CurrencySelect/CurrencySelect'
import { Currency, StoreState } from '../../store/types'
import { useSelector, shallowEqual } from 'react-redux'

export interface ExchangePocketProps {
  amount: number | null
  currency: Currency
  excludeCurrency: Currency
  label: string
  onAmountChange: (amount: number | null) => void
  onCurrencyChange: (value: Currency) => void
}

function ExchangePocket(
  { amount, currency, excludeCurrency, label, onAmountChange, onCurrencyChange }: ExchangePocketProps
): ReactElement {

  const currencies = useSelector<StoreState, Currency[]>(
    ({ currencyExchange: { rates } }) =>
      (Object.keys(rates) as Currency[])
        .filter(currency => currency !== excludeCurrency),
    shallowEqual
  )

  return (
    <Pocket>
      <Label>{label}</Label>
      <PocketInputsContainer>
        <CurrencySelect
          style={{ flex: 'auto' }}
          currencies={currencies}
          onCurrencyChange={onCurrencyChange}
          value={currency} />
        <AmountInput onChange={onAmountChange} amount={amount} />
      </PocketInputsContainer>
    </Pocket>
  );
}

export default ExchangePocket

const Label = styled.div({
  textAlign: 'left',
  color: 'gray',
  fontSize: '1.1em',
})

const Pocket = styled.div({
  display: 'flex',
  flexFlow: 'column nowrap',
  height: '100%',
  flex: 'auto',
  textAlign: 'right',
  border: '1px solid #eaeaea',
  borderRadius: '3px',
  padding: '20px'
})

const PocketInputsContainer = styled.div({
  display: 'flex',
  padding: '30px',
  flexFlow: 'row nowrap'
})
