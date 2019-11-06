import React, { ReactElement } from 'react'
import styled from 'styled-components'
import ExchangePockets from './ExchangePockets'
import ExchangeRate from './ExchangeRate'
import SubmitExchangeButton from './SubmitExchangeButton'
import SwitchExchangeCurrencies from './SwitchExchangeCurrencies'

function CurrencyExchange(): ReactElement {
  return (
    <CurrencyExchangeContainer>
      <ExchangeRate />
      <SwitchExchangeCurrencies />
      <ExchangePockets />
      <SubmitExchangeButton />
    </CurrencyExchangeContainer>
  )
}

export default CurrencyExchange

const CurrencyExchangeContainer = styled.div({
  position: 'relative'
})