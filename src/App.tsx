import React, { ReactElement } from 'react'
import CurrencyAccounts from './components/CurrencyAccounts/CurrencyAccounts'
import CurrencyExchange from './components/CurrencyExchange/CurrencyExchange'

function App(): ReactElement<any> {
  return (
    <>
    <CurrencyAccounts />
    <CurrencyExchange />
    </>
  )
}

export default App
