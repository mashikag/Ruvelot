import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { Currency, StoreState } from '../../store/types'
import { useSelector, shallowEqual } from 'react-redux'

export interface ExchangeRateState {
  fromCurrency: Currency
  toCurrency: Currency
  rate: number
}

function ExchangeRate(): ReactElement {
  const { fromCurrency, toCurrency, rate }: ExchangeRateState =
    useSelector(
      ({
        currencyExchange: {
          exchangeFromCurrency,
          exchangeToCurrency,
          rates
        }
      }: StoreState) => ({
        fromCurrency: exchangeFromCurrency,
        toCurrency: exchangeToCurrency,
        rate: rates[exchangeToCurrency] / rates[exchangeFromCurrency]
      }),
      shallowEqual
    )
  return (
    <ExchangeRateContainer>
      {`1 ${fromCurrency} = ${rate} ${toCurrency}`}
    </ExchangeRateContainer>
  )
}

export default ExchangeRate

const ExchangeRateContainer =
  styled.div({
    color: 'white',
    backgroundColor: '#0075eb',
    fontWeight: 'bold',
    padding: '20px',
    textAlign: 'center',
  })