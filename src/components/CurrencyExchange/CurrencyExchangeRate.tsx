import React, { ReactElement } from 'react'
import { Currency } from '../../store/types'

export interface CurrencyExchangeRateProps {
  fromCurrency: Currency
  toCurrency: Currency
  rate: number
}

function CurrencyExchangeRate(props: CurrencyExchangeRateProps):
  ReactElement<CurrencyExchangeRateProps> {
  return (
    <div>
      {`1 ${props.fromCurrency} = ${props.rate} ${props.toCurrency} `}
    </div>
  )
}

export default CurrencyExchangeRate