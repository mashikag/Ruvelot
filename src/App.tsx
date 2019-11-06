import React, { HTMLAttributes, ReactElement } from 'react'
import styled from 'styled-components'
import CurrencyAccounts from './components/CurrencyAccounts/CurrencyAccounts'
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchange'

function App(): ReactElement<any> {
  return (
    <AppContainer>
      <AppSection>
        <CurrencyAccounts />
      </AppSection>
      <AppSection>
        <CurrencyExchange />
      </AppSection>
    </AppContainer>
  )
}

export default App

const AppContainer =
  styled.div<HTMLAttributes<HTMLDivElement>>({
    fontFamily: 'Arial',
    margin: 'auto',
    maxWidth: '800px',
  })

const AppSection =
  styled.div<HTMLAttributes<HTMLDivElement>>({
    backgroundColor: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: '3px',
    margin: '50px 0',
    padding: '50px',
    width: '100%',
  })