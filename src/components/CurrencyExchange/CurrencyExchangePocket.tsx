import React, { ChangeEventHandler, ReactElement, ChangeEvent } from 'react'
import styled from 'styled-components'
import { ExchangeRates, Currency } from '../../store/types'
import { safeAmount } from '../../utils/currencyExchangeUtils';

const CurrencySelector = styled.select<React.SelectHTMLAttributes<HTMLSelectElement>>({})
const Pocket = styled.div<React.HTMLAttributes<HTMLDivElement>>({})
const ExchangeAmountInput = styled.input<React.InputHTMLAttributes<HTMLInputElement>>({})

export interface CurrencyExchangePocketProps {
  currency: Currency
  amount: number | null
  onCurrencyChange: ChangeEventHandler<HTMLSelectElement>
  onAmountChange: (amount: number | null) => void
  rates: ExchangeRates
}

function createCurrencySelectorOptions(exchangeRates: ExchangeRates):
  JSX.Element[] {
  return Object.keys(exchangeRates).map<JSX.Element>(
    currency => <option key={currency} value={currency}>{currency}</option>
  )
}

function CurrencyExchangePocket(props: CurrencyExchangePocketProps):
  ReactElement<CurrencyExchangePocketProps> {

  const safeOnAmountChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '') {
      target.value = '0'
      props.onAmountChange(null)
    }
    props.onAmountChange(parseFloat(parseFloat(target.value).toFixed(2)))
  }

  return (
    <Pocket>
      <CurrencySelector onChange={props.onCurrencyChange} value={props.currency}>
        {createCurrencySelectorOptions(props.rates)}
      </CurrencySelector>
      <ExchangeAmountInput
        type='number'
        min='0'
        value={props.amount ? safeAmount(props.amount) : ''}
        onChange={safeOnAmountChange}
      />
    </Pocket>
  );
}

export default CurrencyExchangePocket
